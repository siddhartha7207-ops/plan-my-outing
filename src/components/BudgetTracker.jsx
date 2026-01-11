import { motion } from 'framer-motion';
import { IndianRupee, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import './BudgetTracker.css';

function BudgetTracker({
    totalBudget,
    budgetUsed,
    numberOfPeople,
    showBreakdown = true,
    compact = false
}) {
    const categories = [
        { id: 'transport', label: 'Transport', color: '#8B5CF6' },
        { id: 'food', label: 'Food', color: '#F59E0B' },
        { id: 'tickets', label: 'Entry/Tickets', color: '#EC4899' },
        { id: 'misc', label: 'Miscellaneous', color: '#6366F1' }
    ];

    const totalSpent = Object.values(budgetUsed).reduce((sum, val) => sum + val, 0);
    const remaining = totalBudget - totalSpent;
    const percentage = Math.min((totalSpent / totalBudget) * 100, 100);
    const perPersonCost = Math.ceil(totalSpent / numberOfPeople);

    // Determine status
    let status = 'healthy';
    let statusText = 'On Track';
    let StatusIcon = TrendingUp;

    if (percentage > 100) {
        status = 'exceeded';
        statusText = 'Over Budget';
        StatusIcon = AlertTriangle;
    } else if (percentage > 85) {
        status = 'warning';
        statusText = 'Near Limit';
        StatusIcon = TrendingDown;
    }

    return (
        <motion.div
            className={`budget-tracker ${status} ${compact ? 'compact' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {/* Header */}
            <div className="tracker-header">
                <div className="tracker-title">
                    <IndianRupee size={20} />
                    <span>Budget Tracker</span>
                </div>
                <div className={`tracker-status ${status}`}>
                    <StatusIcon size={16} />
                    <span>{statusText}</span>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="tracker-progress">
                <div className="progress-bar-bg">
                    <motion.div
                        className={`progress-bar-fill ${status}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    />

                    {/* Category segments */}
                    {showBreakdown && (
                        <div className="progress-segments">
                            {categories.map(cat => {
                                const catPercent = (budgetUsed[cat.id] / totalBudget) * 100;
                                return catPercent > 0 ? (
                                    <motion.div
                                        key={cat.id}
                                        className="segment"
                                        style={{
                                            width: `${catPercent}%`,
                                            background: cat.color
                                        }}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${catPercent}%` }}
                                        transition={{ duration: 0.8, delay: 0.2 }}
                                    />
                                ) : null;
                            })}
                        </div>
                    )}
                </div>

                <div className="progress-labels">
                    <span>₹0</span>
                    <span>₹{totalBudget}</span>
                </div>
            </div>

            {/* Summary */}
            <div className="tracker-summary">
                <div className="summary-item spent">
                    <span className="summary-label">Spent</span>
                    <span className="summary-value">₹{totalSpent}</span>
                </div>
                <div className={`summary-item remaining ${status}`}>
                    <span className="summary-label">Remaining</span>
                    <span className="summary-value">₹{Math.max(0, remaining)}</span>
                </div>
                <div className="summary-item per-person">
                    <span className="summary-label">Per Person</span>
                    <span className="summary-value">₹{perPersonCost}</span>
                </div>
            </div>

            {/* Breakdown */}
            {showBreakdown && !compact && (
                <div className="tracker-breakdown">
                    <h4 className="breakdown-title">Breakdown</h4>
                    <div className="breakdown-items">
                        {categories.map(cat => {
                            const amount = budgetUsed[cat.id] || 0;
                            const catPercent = totalSpent > 0 ? (amount / totalSpent) * 100 : 0;

                            return (
                                <div key={cat.id} className="breakdown-item">
                                    <div className="breakdown-header">
                                        <div className="breakdown-label">
                                            <span
                                                className="breakdown-dot"
                                                style={{ background: cat.color }}
                                            />
                                            <span>{cat.label}</span>
                                        </div>
                                        <span className="breakdown-amount">₹{amount}</span>
                                    </div>
                                    <div className="breakdown-bar">
                                        <motion.div
                                            className="breakdown-fill"
                                            style={{ background: cat.color }}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${catPercent}%` }}
                                            transition={{ duration: 0.5, delay: 0.3 }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Warning */}
            {status === 'exceeded' && (
                <motion.div
                    className="tracker-warning"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                >
                    <AlertTriangle size={16} />
                    <span>You've exceeded your budget by ₹{Math.abs(remaining)}</span>
                </motion.div>
            )}
        </motion.div>
    );
}

export default BudgetTracker;
