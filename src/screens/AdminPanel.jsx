import React, { useState, useEffect } from 'react';
import useDataStore from '../store/dataStore';
import { Reward } from '../models/Reward.js';
import { useNavigate } from 'react-router-dom';

function AdminPanel() {
  const navigate = useNavigate();
  const getRewards = useDataStore(state => state.getRewards);
  const addReward = useDataStore(state => state.addReward);
  const updateReward = useDataStore(state => state.updateReward);
  const deleteReward = useDataStore(state => state.deleteReward);
  const saveData = useDataStore(state => state.saveData);
  const resetAllProgress = useDataStore(state => state.resetAllProgress);

  // Authentication is handled by TopNavigation component
  // No need for duplicate password check here
  const [isAuthenticated] = useState(true);

  const [rewards, setRewards] = useState([]);
  const [editingReward, setEditingReward] = useState(null);
  const [showRewardForm, setShowRewardForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    cost: '',
    imageUrl: '',
    isActive: true,
  });
  const [error, setError] = useState(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      loadRewards();
    }
  }, [isAuthenticated]);

  const loadRewards = () => {
    const allRewards = getRewards(false);
    setRewards(allRewards);
  };

  const handleCancel = () => {
    navigate('/');
  };

  const handleCreateNew = () => {
    setEditingReward(null);
    setFormData({
      name: '',
      description: '',
      cost: '',
      imageUrl: '',
      isActive: true,
    });
    setShowRewardForm(true);
    setError(null);
  };

  const handleEdit = (reward) => {
    setEditingReward(reward);
    setFormData({
      name: reward.name,
      description: reward.description,
      cost: reward.cost.toString(),
      imageUrl: reward.imageUrl || '',
      isActive: reward.isActive,
    });
    setShowRewardForm(true);
    setError(null);
  };

  const handleDelete = async (rewardId) => {
    if (!window.confirm('Are you sure you want to delete this reward? It will be hidden from the shop.')) {
      return;
    }

    try {
      await deleteReward(rewardId);
      await saveData();
      loadRewards();
    } catch (err) {
      setError(err.message || 'Failed to delete reward');
      setTimeout(() => setError(null), 5000);
    }
  };

  const handleResetAllProgress = async () => {
    try {
      await resetAllProgress();
      setError(null);
      setShowResetConfirm(false);
      // Show success message
      const successMsg = 'All progress has been reset successfully!';
      setError(successMsg);
      setTimeout(() => setError(null), 5000);
      // Reload the page to reflect changes
      window.location.reload();
    } catch (err) {
      setError(err.message || 'Failed to reset progress');
      setTimeout(() => setError(null), 5000);
      setShowResetConfirm(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim()) {
      setError('Reward name is required');
      return;
    }

    if (!formData.description.trim()) {
      setError('Reward description is required');
      return;
    }

    const cost = parseInt(formData.cost);
    if (isNaN(cost) || cost < 1) {
      setError('Cost must be a positive number');
      return;
    }

    try {
      if (editingReward) {
        const updatedReward = editingReward.copyWith({
          name: formData.name.trim(),
          description: formData.description.trim(),
          cost: cost,
          imageUrl: formData.imageUrl.trim() || null,
          isActive: formData.isActive,
        });
        await updateReward(updatedReward);
      } else {
        await addReward({
          name: formData.name.trim(),
          description: formData.description.trim(),
          cost: cost,
          imageUrl: formData.imageUrl.trim() || null,
          isActive: formData.isActive,
        });
      }

      await saveData();
      loadRewards();
      setShowRewardForm(false);
      setEditingReward(null);
      setFormData({
        name: '',
        description: '',
        cost: '',
        imageUrl: '',
        isActive: true,
      });
    } catch (err) {
      setError(err.message || 'Failed to save reward');
      setTimeout(() => setError(null), 5000);
    }
  };


  return (
    <div style={{
      flex: 1,
      overflowY: 'auto',
      padding: '20px',
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
      }}>
        <h1 style={{ margin: 0, color: '#333' }}>Admin Panel</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => navigate('/art-grading')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#9b59b6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            🎨 Grade Art
          </button>
          <button
            onClick={() => setShowResetConfirm(true)}
            style={{
              padding: '10px 20px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
          🔄 Reset All Progress
          </button>
          <button
            onClick={handleCreateNew}
            style={{
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            + Create New Reward
          </button>
        </div>
      </div>

      <div style={{
        backgroundColor: '#fff3cd',
        border: '1px solid #ffc107',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '20px',
      }}>
        <h2 style={{ margin: '0 0 10px 0', color: '#856404', fontSize: '18px' }}>Reward Management</h2>
        <p style={{ margin: 0, color: '#856404', fontSize: '14px' }}>
          Manage rewards that students can purchase with their points.
        </p>
      </div>

      {error && (
        <div style={{
          backgroundColor: '#f8d7da',
          color: '#721c24',
          padding: '12px',
          borderRadius: '4px',
          marginBottom: '20px',
          border: '1px solid #f5c6cb',
        }}>
          {error}
        </div>
      )}

      {/* Rewards List */}
      {rewards.length === 0 ? (
        <div style={{
          padding: '40px',
          textAlign: 'center',
          color: '#666',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
        }}>
          <p>No rewards created yet. Click "Create New Reward" to get started!</p>
        </div>
      ) : (
        <div style={{
          backgroundColor: 'white',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          overflow: 'hidden',
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
          }}>
            <thead>
              <tr style={{
                backgroundColor: '#f8f9fa',
                borderBottom: '2px solid #e0e0e0',
              }}>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Name</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Description</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Cost</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Status</th>
                <th style={{ padding: '12px', textAlign: 'right', fontWeight: 'bold' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rewards.map((reward, index) => (
                <tr
                  key={reward.id}
                  style={{
                    borderBottom: index < rewards.length - 1 ? '1px solid #e0e0e0' : 'none',
                    backgroundColor: reward.isActive ? 'white' : '#f8f9fa',
                  }}
                >
                  <td style={{ padding: '12px' }}>{reward.name}</td>
                  <td style={{ padding: '12px', color: '#666', fontSize: '14px' }}>
                    {reward.description}
                  </td>
                  <td style={{ padding: '12px', fontWeight: 'bold', color: '#007bff' }}>
                    {reward.cost} pts
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      backgroundColor: reward.isActive ? '#d4edda' : '#f8d7da',
                      color: reward.isActive ? '#155724' : '#721c24',
                    }}>
                      {reward.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => handleEdit(reward)}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#007bff',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '12px',
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(reward.id)}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '12px',
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Reward Form Modal */}
      {showRewardForm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '90vh',
            overflowY: 'auto',
          }}>
            <h3 style={{ marginTop: 0, marginBottom: '20px' }}>
              {editingReward ? 'Edit Reward' : 'Create New Reward'}
            </h3>

            <form onSubmit={handleFormSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '8px',
                    fontSize: '14px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                  }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '8px',
                    fontSize: '14px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    resize: 'vertical',
                  }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Cost (Points) *
                </label>
                <input
                  type="number"
                  value={formData.cost}
                  onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                  required
                  min="1"
                  style={{
                    width: '100%',
                    padding: '8px',
                    fontSize: '14px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                  }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Image URL (Optional)
                </label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://example.com/image.png"
                  style={{
                    width: '100%',
                    padding: '8px',
                    fontSize: '14px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  />
                  <span>Active (visible in shop)</span>
                </label>
              </div>

              {error && (
                <div style={{
                  backgroundColor: '#f8d7da',
                  color: '#721c24',
                  padding: '10px',
                  borderRadius: '4px',
                  marginBottom: '15px',
                  fontSize: '14px',
                }}>
                  {error}
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => {
                    setShowRewardForm(false);
                    setEditingReward(null);
                    setError(null);
                  }}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold',
                  }}
                >
                  {editingReward ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            maxWidth: '500px',
            width: '90%',
          }}>
            <h3 style={{ marginTop: 0, marginBottom: '15px', color: '#dc3545' }}>
              ⚠️ Reset All Progress
            </h3>
            <p style={{ marginBottom: '20px', color: '#666', lineHeight: '1.6' }}>
              Are you sure you want to reset ALL progress? This will:
            </p>
            <ul style={{ 
              marginBottom: '20px', 
              paddingLeft: '20px',
              color: '#666',
              lineHeight: '1.8'
            }}>
              <li>Delete all students</li>
              <li>Clear all lesson progress and completions</li>
              <li>Reset points balance to 0</li>
              <li>Clear all purchases</li>
            </ul>
            <p style={{ 
              marginBottom: '20px', 
              color: '#dc3545', 
              fontWeight: 'bold',
              fontSize: '14px'
            }}>
              This action cannot be undone!
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowResetConfirm(false)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleResetAllProgress}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold',
                }}
              >
                Yes, Reset Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
