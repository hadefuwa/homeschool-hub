import React, { useState } from 'react';
import useDataStore from '../store/dataStore';
import { useNavigate } from 'react-router-dom';

function ShopScreen() {
  const navigate = useNavigate();
  const getRewards = useDataStore(state => state.getRewards);
  const getPurchases = useDataStore(state => state.getPurchases);
  const getPointsBalance = useDataStore(state => state.getPointsBalance);
  const getTotalPointsSpent = useDataStore(state => state.getTotalPointsSpent);
  const getTotalPointsEarned = useDataStore(state => state.getTotalPointsEarned);
  const getPointsActivities = useDataStore(state => state.getPointsActivities);
  const purchaseReward = useDataStore(state => state.purchaseReward);
  const saveData = useDataStore(state => state.saveData);

  const [purchasingId, setPurchasingId] = useState(null);
  const [error, setError] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(null);

  const rewards = getRewards(true);
  const purchases = getPurchases();
  const pointsBalance = getPointsBalance();
  const totalPointsSpent = getTotalPointsSpent();
  const totalPointsEarned = getTotalPointsEarned();
  const pointsActivities = getPointsActivities();
  
  // Calculate purchase counts for each reward
  const purchaseCounts = purchases.reduce((acc, purchase) => {
    acc[purchase.rewardId] = (acc[purchase.rewardId] || 0) + 1;
    return acc;
  }, {});

  const handlePurchase = async (reward) => {
    if (pointsBalance < reward.cost) {
      setError(`You need ${reward.cost} points, but you only have ${pointsBalance} points.`);
      setTimeout(() => setError(null), 5000);
      return;
    }

    setShowConfirmDialog(reward);
  };

  const confirmPurchase = async (reward) => {
    setShowConfirmDialog(null);
    setPurchasingId(reward.id);
    setError(null);

    try {
      await purchaseReward(reward.id);
      await saveData();
    } catch (err) {
      setError(err.message || 'Failed to purchase reward. Please try again.');
      setTimeout(() => setError(null), 5000);
    } finally {
      setPurchasingId(null);
    }
  };

  // Show all active rewards (no filtering)
  const availableRewards = rewards;
  // Show rewards that have been purchased at least once
  const ownedRewards = rewards.filter(r => purchaseCounts[r.id] > 0);

  // Format timestamp for display
  const formatTimestamp = (date) => {
    const purchaseDate = date instanceof Date ? date : new Date(date);
    const now = new Date();
    const diffMs = now - purchaseDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    
    // For older purchases, show full date
    return purchaseDate.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Get purchase history sorted by most recent first
  const purchaseHistory = purchases
    .map(purchase => {
      const reward = rewards.find(r => r.id === purchase.rewardId);
      return {
        ...purchase,
        rewardName: reward ? reward.name : 'Unknown Reward',
        rewardDescription: reward ? reward.description : '',
      };
    })
    .sort((a, b) => {
      const dateA = a.purchasedAt instanceof Date ? a.purchasedAt : new Date(a.purchasedAt);
      const dateB = b.purchasedAt instanceof Date ? b.purchasedAt : new Date(b.purchasedAt);
      return dateB - dateA; // Most recent first
    });

  return (
    <div style={{
      flex: 1,
      overflowY: 'auto',
      padding: '20px',
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
    }}>
      {/* Points Balance Header */}
      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        textAlign: 'center',
        border: '2px solid #007bff',
      }}>
        <h2 style={{ margin: '0 0 15px 0', color: '#333' }}>Your Points</h2>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '30px',
          flexWrap: 'wrap',
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: '#007bff',
            }}>
              {pointsBalance}
            </div>
            <div style={{ color: '#666', fontSize: '14px', marginTop: '5px' }}>
              Available
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#28a745',
            }}>
              {totalPointsEarned}
            </div>
            <div style={{ color: '#666', fontSize: '14px', marginTop: '5px' }}>
              Total Earned
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#dc3545',
            }}>
              {totalPointsSpent}
            </div>
            <div style={{ color: '#666', fontSize: '14px', marginTop: '5px' }}>
              Spent
            </div>
          </div>
        </div>
        <p style={{ margin: '15px 0 0 0', color: '#666' }}>
          Earn points by completing lessons and earning medals!
        </p>
      </div>

      {/* Error Message */}
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

      {/* Available Rewards */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '20px', color: '#333' }}>Available Rewards</h2>
        {availableRewards.length === 0 ? (
          <div style={{
            padding: '40px',
            textAlign: 'center',
            color: '#666',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
          }}>
            <p>No rewards available. Ask a parent to add rewards in the Admin panel!</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px',
          }}>
            {availableRewards.map(reward => (
              <div
                key={reward.id}
                style={{
                  backgroundColor: 'white',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                }}
              >
                {reward.imageUrl && (
                  <div style={{
                    width: '100%',
                    height: '150px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '4px',
                    marginBottom: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}>
                    <img
                      src={reward.imageUrl}
                      alt={reward.name}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{reward.name}</h3>
                <p style={{
                  margin: '0 0 15px 0',
                  color: '#666',
                  flex: 1,
                  fontSize: '14px',
                }}>
                  {reward.description}
                </p>
                {purchaseCounts[reward.id] > 0 && (
                  <div style={{
                    marginBottom: '10px',
                    fontSize: '12px',
                    color: '#28a745',
                    fontWeight: 'bold',
                  }}>
                    Purchased {purchaseCounts[reward.id]} time{purchaseCounts[reward.id] !== 1 ? 's' : ''}
                  </div>
                )}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 'auto',
                }}>
                  <div style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#007bff',
                  }}>
                    {reward.cost} pts
                  </div>
                  <button
                    onClick={() => handlePurchase(reward)}
                    disabled={pointsBalance < reward.cost || purchasingId === reward.id}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: pointsBalance >= reward.cost ? '#28a745' : '#6c757d',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: pointsBalance >= reward.cost ? 'pointer' : 'not-allowed',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      opacity: purchasingId === reward.id ? 0.6 : 1,
                    }}
                  >
                    {purchasingId === reward.id ? 'Purchasing...' : 'Purchase'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Owned Rewards */}
      {ownedRewards.length > 0 && (
        <div>
          <h2 style={{ marginBottom: '20px', color: '#333' }}>Your Rewards</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px',
          }}>
            {ownedRewards.map(reward => (
              <div
                key={reward.id}
                style={{
                  backgroundColor: '#e8f5e9',
                  border: '2px solid #4caf50',
                  borderRadius: '8px',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  backgroundColor: '#4caf50',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}>
                  OWNED ×{purchaseCounts[reward.id]}
                </div>
                {reward.imageUrl && (
                  <div style={{
                    width: '100%',
                    height: '150px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '4px',
                    marginBottom: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}>
                    <img
                      src={reward.imageUrl}
                      alt={reward.name}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{reward.name}</h3>
                <p style={{
                  margin: '0',
                  color: '#666',
                  fontSize: '14px',
                }}>
                  {reward.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Purchase History */}
      {purchaseHistory.length > 0 && (
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ marginBottom: '20px', color: '#333' }}>Purchase History</h2>
          <div style={{
            backgroundColor: 'white',
            border: '2px solid #e0e0e0',
            borderRadius: '8px',
            overflow: 'hidden',
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr',
              gap: '15px',
              padding: '15px 20px',
              backgroundColor: '#f8f9fa',
              borderBottom: '2px solid #e0e0e0',
              fontWeight: 'bold',
              fontSize: '14px',
              color: '#666',
            }}>
              <div>Reward</div>
              <div>Points</div>
              <div>Date</div>
            </div>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {purchaseHistory.map((purchase, index) => (
                <div
                  key={purchase.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr',
                    gap: '15px',
                    padding: '15px 20px',
                    borderBottom: index < purchaseHistory.length - 1 ? '1px solid #e0e0e0' : 'none',
                    backgroundColor: index % 2 === 0 ? 'white' : '#f8f9fa',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#e8f5e9';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = index % 2 === 0 ? 'white' : '#f8f9fa';
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 'bold', color: '#333', marginBottom: '4px' }}>
                      {purchase.rewardName}
                    </div>
                    {purchase.rewardDescription && (
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        {purchase.rewardDescription}
                      </div>
                    )}
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#dc3545',
                  }}>
                    {purchase.pointsSpent} pts
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '14px',
                    color: '#666',
                  }}>
                    {formatTimestamp(purchase.purchasedAt)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Points Earned Log */}
      {pointsActivities.length > 0 && (
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ marginBottom: '20px', color: '#333' }}>Points Earned</h2>
          <div style={{
            backgroundColor: 'white',
            border: '2px solid #e0e0e0',
            borderRadius: '8px',
            overflow: 'hidden',
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1fr',
              gap: '15px',
              padding: '15px 20px',
              backgroundColor: '#f8f9fa',
              borderBottom: '2px solid #e0e0e0',
              fontWeight: 'bold',
              fontSize: '14px',
              color: '#666',
            }}>
              <div>Lesson</div>
              <div>Medal</div>
              <div>Points</div>
              <div>Date</div>
            </div>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {pointsActivities
                .sort((a, b) => {
                  const dateA = a.earnedAt instanceof Date ? a.earnedAt : new Date(a.earnedAt);
                  const dateB = b.earnedAt instanceof Date ? b.earnedAt : new Date(b.earnedAt);
                  return dateB - dateA; // Most recent first
                })
                .map((activity, index) => {
                  // Medal badge colors
                  const medalColors = {
                    'Platinum': { bg: '#e0e0e0', color: '#424242' },
                    'Gold': { bg: '#ffd700', color: '#000' },
                    'Silver': { bg: '#c0c0c0', color: '#000' },
                    'Bronze': { bg: '#cd7f32', color: '#fff' },
                  };
                  const medalStyle = medalColors[activity.medal] || medalColors['Bronze'];

                  return (
                    <div
                      key={activity.id}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '2fr 1fr 1fr 1fr',
                        gap: '15px',
                        padding: '15px 20px',
                        borderBottom: index < pointsActivities.length - 1 ? '1px solid #e0e0e0' : 'none',
                        backgroundColor: index % 2 === 0 ? 'white' : '#f8f9fa',
                        transition: 'background-color 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#fff3cd';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = index % 2 === 0 ? 'white' : '#f8f9fa';
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 'bold', color: '#333', marginBottom: '4px' }}>
                          {activity.lessonTitle}
                        </div>
                        <div style={{ fontSize: '12px', color: '#666' }}>
                          {activity.yearId.charAt(0).toUpperCase() + activity.yearId.slice(1).replace(/(\d)/, ' $1')}
                        </div>
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                      }}>
                        <span style={{
                          padding: '4px 12px',
                          backgroundColor: medalStyle.bg,
                          color: medalStyle.color,
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                        }}>
                          {activity.medal}
                        </span>
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#28a745',
                      }}>
                        +{activity.pointsEarned} pts
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '14px',
                        color: '#666',
                      }}>
                        {formatTimestamp(activity.earnedAt)}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* Purchase Confirmation Dialog */}
      {showConfirmDialog && (
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
            maxWidth: '400px',
            width: '90%',
          }}>
            <h3 style={{ marginTop: 0, marginBottom: '15px' }}>Confirm Purchase</h3>
            <p style={{ marginBottom: '10px' }}>
              Purchase <strong>{showConfirmDialog.name}</strong> for <strong>{showConfirmDialog.cost} points</strong>?
            </p>
            <p style={{ marginBottom: '20px', color: '#666', fontSize: '14px' }}>
              You will have {pointsBalance - showConfirmDialog.cost} points remaining.
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowConfirmDialog(null)}
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
                onClick={() => confirmPurchase(showConfirmDialog)}
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
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShopScreen;
