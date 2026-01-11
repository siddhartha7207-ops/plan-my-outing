import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import './ProgressStepper.css';

function ProgressStepper({ steps, currentStep, onStepClick }) {
    return (
        <div className="stepper-container">
            <div className="stepper">
                {steps.map((step, index) => {
                    const isCompleted = index < currentStep;
                    const isCurrent = index === currentStep;
                    const isClickable = index <= currentStep;

                    return (
                        <div key={step.id} className="step-wrapper">
                            {/* Connector Line */}
                            {index > 0 && (
                                <div className={`step-connector ${isCompleted ? 'completed' : ''}`}>
                                    <motion.div
                                        className="connector-fill"
                                        initial={{ width: 0 }}
                                        animate={{ width: isCompleted ? '100%' : '0%' }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                    />
                                </div>
                            )}

                            {/* Step Circle */}
                            <motion.button
                                className={`step-circle ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}
                                onClick={() => isClickable && onStepClick?.(index)}
                                disabled={!isClickable}
                                whileHover={isClickable ? { scale: 1.1 } : {}}
                                whileTap={isClickable ? { scale: 0.95 } : {}}
                            >
                                {isCompleted ? (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                                    >
                                        <Check size={18} />
                                    </motion.div>
                                ) : (
                                    <span>{index + 1}</span>
                                )}

                                {isCurrent && (
                                    <motion.div
                                        className="step-pulse"
                                        initial={{ scale: 1, opacity: 0.5 }}
                                        animate={{ scale: 1.5, opacity: 0 }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    />
                                )}
                            </motion.button>

                            {/* Step Label */}
                            <div className={`step-label ${isCurrent ? 'current' : ''}`}>
                                <span className="step-title">{step.title}</span>
                                {step.subtitle && (
                                    <span className="step-subtitle">{step.subtitle}</span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ProgressStepper;
