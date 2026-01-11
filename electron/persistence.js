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
      return json;
    } catch (error) {
      // File doesn't exist or is invalid, return default data
      if (error.code === 'ENOENT') {
        console.log('Data file not found, using default data');
        const defaultData = getDefaultData();
        await saveData(defaultData);
        return defaultData;
      }
      throw error;
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

