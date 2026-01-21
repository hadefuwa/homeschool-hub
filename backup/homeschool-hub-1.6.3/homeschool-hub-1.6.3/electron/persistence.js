import { app } from 'electron';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Get the data file path (Desktop/HomeschoolHub/data.json)
 */
export const getDataPath = () => {
  const userHome = app.getPath('home');
  const desktopPath = path.join(userHome, 'Desktop');
  const appDir = path.join(desktopPath, 'HomeschoolHub');
  return path.join(appDir, 'data.json');
};

/**
 * Ensure the data directory exists
 */
export const ensureDataDirectory = async () => {
  const dataPath = getDataPath();
  const dataDir = path.dirname(dataPath);
  try {
    await fs.mkdir(dataDir, { recursive: true });
  } catch (error) {
    console.error('Error creating data directory:', error);
    throw error;
  }
};

/**
 * Load data from file
 */
export const loadData = async (getDefaultData) => {
  try {
    const dataPath = getDataPath();
    await ensureDataDirectory();
    
    try {
      const data = await fs.readFile(dataPath, 'utf-8');
      const json = JSON.parse(data);
      
      // Validate that the data structure is correct
      // If it's missing critical fields or is malformed, treat as fresh install
      if (!json || typeof json !== 'object') {
        console.log('Data file is invalid, using default data');
        const defaultData = getDefaultData();
        await saveData(defaultData);
        return defaultData;
      }
      
      return json;
    } catch (error) {
      // File doesn't exist or is invalid, return default data
      if (error.code === 'ENOENT') {
        console.log('Data file not found, using default data');
        const defaultData = getDefaultData();
        await saveData(defaultData);
        return defaultData;
      }
      // JSON parsing error or other file read error - treat as fresh install
      console.log('Error reading/parsing data file, using default data:', error.message);
      const defaultData = getDefaultData();
      await saveData(defaultData);
      return defaultData;
    }
  } catch (error) {
    console.error('Error loading data:', error);
    const defaultData = getDefaultData();
    await saveData(defaultData);
    return defaultData;
  }
};

/**
 * Save data to file
 */
export const saveData = async (data) => {
  try {
    const dataPath = getDataPath();
    await ensureDataDirectory();
    
    const jsonString = JSON.stringify(data, null, 2);
    await fs.writeFile(dataPath, jsonString, 'utf-8');
    console.log('Data saved successfully to:', dataPath);
  } catch (error) {
    console.error('Error saving data:', error);
    throw error;
  }
};

/**
 * Get the activity log file path (Desktop/HomeschoolHub/activity.log)
 */
export const getActivityLogPath = () => {
  const userHome = app.getPath('home');
  const desktopPath = path.join(userHome, 'Desktop');
  const appDir = path.join(desktopPath, 'HomeschoolHub');
  return path.join(appDir, 'activity.log');
};

/**
 * Write activity log entry
 */
export const writeActivityLog = async (entry) => {
  try {
    const logPath = getActivityLogPath();
    await ensureDataDirectory();
    
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      ...entry,
    };
    
    const logLine = JSON.stringify(logEntry) + '\n';
    await fs.appendFile(logPath, logLine, 'utf-8');
  } catch (error) {
    console.error('Error writing activity log:', error);
    throw error;
  }
};

/**
 * Read activity log entries (returns last N entries, default 50)
 */
export const readActivityLog = async (limit = 50) => {
  try {
    const logPath = getActivityLogPath();
    
    // Check if file exists
    try {
      await fs.access(logPath);
    } catch (error) {
      // File doesn't exist, return empty array
      return [];
    }
    
    // Read the entire file
    const content = await fs.readFile(logPath, 'utf-8');
    const lines = content.trim().split('\n').filter(line => line.trim());
    
    // Parse each line as JSON and reverse to get most recent first
    const entries = lines
      .map(line => {
        try {
          return JSON.parse(line);
        } catch (error) {
          console.warn('Error parsing log line:', line, error);
          return null;
        }
      })
      .filter(entry => entry !== null)
      .reverse()
      .slice(0, limit);
    
    return entries;
  } catch (error) {
    console.error('Error reading activity log:', error);
    return [];
  }
};



