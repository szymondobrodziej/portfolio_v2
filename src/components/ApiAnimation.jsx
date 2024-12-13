import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import DataFlow from './ApiAnimation/DataFlow';

// Helper function to generate UUID
const generateUUID = () => {
  let dt = new Date().getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (dt + Math.random()*16)%16 | 0;
    dt = Math.floor(dt/16);
    return (c === 'x' ? r : (r&0x3|0x8)).toString(16);
  });
};

const ApiAnimation = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [isPlaying, setIsPlaying] = useState(true);
  const [showError, setShowError] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [requestDetails, setRequestDetails] = useState(null);

  useEffect(() => {
    if (apiSteps[currentStep]) {
      setRequestDetails(apiSteps[currentStep].details);
    }
  }, [currentStep]);

  const apiSteps = [
    {
      id: 'request_init',
      title: t('animation.steps.request.title'),
      description: t('animation.steps.request.description'),
      details: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer token123',
          'Accept': 'application/json',
          'User-Agent': 'Portfolio/1.0',
          'Accept-Language': 'en-US,en;q=0.9',
          'X-Request-ID': generateUUID()
        },
        endpoint: '/api/data',
        body: {
          query: 'portfolio_data',
          filters: ['projects', 'skills'],
          limit: 10,
          offset: 0
        },
        timestamp: new Date().toISOString()
      },
      duration: 1000
    },
    {
      id: 'validation',
      title: t('animation.steps.validation.title'),
      description: t('animation.steps.validation.description'),
      details: {
        checks: [
          'JWT Token validation',
          'Rate limit check (150/15min)',
          'Request body schema validation',
          'Input sanitization & XSS prevention',
          'API version compatibility',
          'Content-Type verification',
          'Request size validation (<5MB)',
          'IP whitelist verification'
        ],
        securityInfo: {
          encryption: 'TLS 1.3',
          authMethod: 'Bearer JWT',
          rateLimit: '150 requests/15min'
        }
      },
      duration: 1000
    },
    {
      id: 'processing',
      title: t('animation.steps.processing.title'),
      description: t('animation.steps.processing.description'),
      details: {
        operations: [
          'Query parameter parsing',
          'Database connection pool allocation',
          'Cache lookup (Redis)',
          'SQL query optimization',
          'Data aggregation & filtering',
          'Response compression (gzip)',
          'ETags generation',
          'Performance metrics collection'
        ],
        performance: {
          dbQueryTime: '45ms',
          cacheHitRatio: '95%',
          compressionRatio: '68%',
          totalProcessingTime: '120ms'
        },
        systemLoad: {
          cpu: '32%',
          memory: '45%',
          activeConnections: 48
        }
      },
      duration: 1000
    },
    {
      id: 'response',
      title: t('animation.steps.response.title'),
      description: t('animation.steps.response.description'),
      details: {
        status: 200,
        statusText: 'OK',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'public, max-age=3600',
          'ETag': 'W/"a8e-Hs8JzZKBaB7q3p+ZXaFX4wGaHXw"',
          'X-Response-Time': '120ms',
          'X-RateLimit-Remaining': '149',
          'Content-Encoding': 'gzip',
          'Vary': 'Accept-Encoding',
          'X-Content-Type-Options': 'nosniff',
          'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
        },
        responseSize: {
          raw: '2.8KB',
          compressed: '0.9KB'
        },
        metrics: {
          ttfb: '95ms',
          totalTime: '145ms',
          serverProcessing: '120ms'
        }
      },
      duration: 1000
    }
  ];

  const challenges = [
    'authentication',
    'authorization',
    'data_validation',
    'error_handling',
    'caching',
    'rate_limiting',
    'file_upload',
    'security_checks',
    'concurrency',
    'version_control',
    'partial_updates',
    'data_integrity',
    'cascade_deletion',
    'soft_delete',
    'recovery'
  ];

  useEffect(() => {
    let stepInterval;
    if (isPlaying && !showError) {
      stepInterval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % apiSteps.length);
        const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
        setCurrentChallenge(randomChallenge);
        setIsProcessing(true);
        setTimeout(() => setIsProcessing(false), 2000);
      }, 4000);
    }
    return () => clearInterval(stepInterval);
  }, [isPlaying, showError, currentStep]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  const renderDetails = () => {
    if (!requestDetails) return null;

    return (
      <motion.div
        className="mt-2 rounded-md bg-gray-100 p-3 text-sm dark:bg-gray-800 min-h-[200px]"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {apiSteps[currentStep].id === 'request_init' && requestDetails && (
              <div className="space-y-2 max-w-full">
                <div className="flex items-center space-x-2 overflow-x-auto">
                  <span className="font-mono text-blue-600 dark:text-blue-400 whitespace-nowrap">{requestDetails.method}</span>
                  <span className="text-gray-600 dark:text-gray-400 whitespace-nowrap">{requestDetails.endpoint}</span>
                  <span className="text-xs text-gray-500 whitespace-nowrap">({new Date(requestDetails.timestamp).toLocaleTimeString()})</span>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-gray-500 dark:text-gray-500">Headers:</div>
                  <div className="overflow-x-auto">
                    {requestDetails.headers && Object.entries(requestDetails.headers).map(([key, value]) => (
                      <div key={key} className="flex items-center space-x-2 pl-2 font-mono text-xs">
                        <span className="text-purple-600 dark:text-purple-400 whitespace-nowrap">{key}:</span>
                        <span className="text-gray-600 dark:text-gray-400 break-all">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {requestDetails.body && (
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500 dark:text-gray-500">Request Body:</div>
                    <pre className="pl-2 text-xs text-gray-600 dark:text-gray-400 overflow-x-auto">
                      {JSON.stringify(requestDetails.body, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            )}

            {apiSteps[currentStep].id === 'validation' && requestDetails && requestDetails.checks && (
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="text-xs text-gray-500 dark:text-gray-500">Security Checks:</div>
                  {requestDetails.checks.map((check, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="h-4 w-4 rounded-full bg-green-500"
                      />
                      <span>{check}</span>
                    </div>
                  ))}
                </div>
                {requestDetails.securityInfo && (
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500 dark:text-gray-500">Security Configuration:</div>
                    {Object.entries(requestDetails.securityInfo).map(([key, value]) => (
                      <div key={key} className="flex items-center space-x-2 pl-2 text-xs">
                        <span className="font-medium text-gray-600 dark:text-gray-400">{key}:</span>
                        <span className="text-gray-600 dark:text-gray-400">{value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {apiSteps[currentStep].id === 'processing' && requestDetails && requestDetails.operations && (
              <div className="space-y-3">
                <div className="space-y-1">
                  {requestDetails.operations.map((operation, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="h-4 w-4"
                      >
                        <svg className="h-4 w-4 text-blue-500" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"
                          />
                        </svg>
                      </motion.div>
                      <span>{operation}</span>
                    </div>
                  ))}
                </div>
                {requestDetails.performance && (
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500 dark:text-gray-500">Performance Metrics:</div>
                    {Object.entries(requestDetails.performance).map(([key, value]) => (
                      <div key={key} className="flex items-center space-x-2 pl-2 text-xs">
                        <span className="font-medium text-gray-600 dark:text-gray-400">{key}:</span>
                        <span className="text-gray-600 dark:text-gray-400">{value}</span>
                      </div>
                    ))}
                  </div>
                )}
                {requestDetails.systemLoad && (
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500 dark:text-gray-500">System Status:</div>
                    {Object.entries(requestDetails.systemLoad).map(([key, value]) => (
                      <div key={key} className="flex items-center space-x-2 pl-2 text-xs">
                        <span className="font-medium text-gray-600 dark:text-gray-400">{key}:</span>
                        <motion.div
                          className="h-1.5 w-24 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700"
                        >
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: value }}
                            className="h-full rounded-full bg-blue-500"
                            transition={{ duration: 1 }}
                          />
                        </motion.div>
                        <span className="text-xs text-gray-500">{value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {apiSteps[currentStep].id === 'response' && requestDetails && (
              <div className="space-y-3 max-w-full">
                <div className="flex items-center space-x-2">
                  <span className={`font-medium ${requestDetails.status < 400 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {requestDetails.status}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">{requestDetails.statusText}</span>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-gray-500 dark:text-gray-500">Response Headers:</div>
                  <div className="overflow-x-auto">
                    {requestDetails.headers && Object.entries(requestDetails.headers).map(([key, value]) => (
                      <div key={key} className="flex items-center space-x-2 pl-2 font-mono text-xs">
                        <span className="text-purple-600 dark:text-purple-400 whitespace-nowrap">{key}:</span>
                        <span className="text-gray-600 dark:text-gray-400 break-all">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {requestDetails.responseSize && (
                    <div className="space-y-1">
                      <div className="text-xs text-gray-500 dark:text-gray-500">Response Size:</div>
                      {Object.entries(requestDetails.responseSize || {}).map(([key, value]) => (
                        <div key={key} className="flex items-center space-x-2 pl-2 text-xs">
                          <span className="font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">{key}:</span>
                          <span className="text-gray-600 dark:text-gray-400">{value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {requestDetails.metrics && (
                    <div className="space-y-1">
                      <div className="text-xs text-gray-500 dark:text-gray-500">Performance:</div>
                      {Object.entries(requestDetails.metrics || {}).map(([key, value]) => (
                        <div key={key} className="flex items-center space-x-2 pl-2 text-xs">
                          <span className="font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">{key}:</span>
                          <span className="text-gray-600 dark:text-gray-400">{value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold gradient-text">{t('animation.title')}</h2>
        <h3 className="text-xl text-gray-600 dark:text-gray-300">{t('animation.subtitle')}</h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">{t('animation.description')}</p>
      </div>

      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 min-h-[600px]">
        <motion.div
          className="relative rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800 h-[1200px] overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <motion.div variants={itemVariants} className="flex items-center space-x-4">
              <div className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                {t('animation.client')}
              </div>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
              <div className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                {t('animation.server')}
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex space-x-3">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => setShowError(!showError)}
                className={`rounded-md px-4 py-2 text-sm font-medium ${
                  showError
                    ? 'bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400'
                    : 'bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400'
                }`}
              >
                {showError ? t('animation.forceError') : t('animation.success')}
              </motion.button>
              
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => setIsPlaying(!isPlaying)}
                className="rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400"
              >
                {isPlaying ? t('animation.pause') : t('animation.play')}
              </motion.button>
            </motion.div>
          </div>

          {/* Animation Area */}
          <div className="relative mb-8 h-[250px]">
            <div className="mb-4 flex items-center justify-between">
              <motion.div variants={itemVariants} className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t('animation.request')}
              </motion.div>
              <motion.div variants={itemVariants} className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t('animation.response')}
              </motion.div>
            </div>

            <DataFlow isPlaying={isPlaying} showError={showError} isProcessing={isProcessing} />
          </div>

          {/* Step Description */}
          <motion.div
            variants={itemVariants}
            className="mb-8 rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50 h-[520px] overflow-y-auto"
          >
            <AnimatePresence mode="wait">
              {isPlaying && !showError && (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-2"
                >
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300">
                    {apiSteps[currentStep].title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {apiSteps[currentStep].description}
                  </p>
                  {renderDetails()}
                </motion.div>
              )}
              {showError && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-2"
                >
                  <h3 className="font-semibold text-red-600 dark:text-red-400">
                    {t('animation.error.title')}
                  </h3>
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {t('animation.error.description')}
                  </p>
                  <div className="mt-2 rounded-md bg-red-100 p-3 dark:bg-red-900/30">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-red-600 dark:text-red-400">
                        {t('animation.error.status')}
                      </span>
                    </div>
                    <div className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {t('animation.error.details')}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Current Challenge Display */}
          <motion.div
            variants={itemVariants}
            className="mb-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50 h-[200px] overflow-y-auto"
          >
            <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              {t('animation.commonChallenges')}
            </h3>
            <AnimatePresence mode="wait">
              {currentChallenge && (
                <motion.div
                  key={currentChallenge}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  {t(`animation.challenges.${currentChallenge}`)}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Processing Status */}
          <motion.div
            variants={itemVariants}
            className={`absolute bottom-4 right-4 flex items-center space-x-2 rounded-full ${
              showError ? 'bg-red-100 dark:bg-red-900/30' : 'bg-green-100 dark:bg-green-900/30'
            } px-3 py-1`}
          >
            <div
              className={`h-2 w-2 rounded-full ${
                isProcessing
                  ? showError
                    ? 'animate-pulse bg-red-500'
                    : 'animate-pulse bg-green-500'
                  : showError
                  ? 'bg-red-500'
                  : 'bg-green-500'
              }`}
            />
            <span
              className={`text-xs font-medium ${
                showError ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
              }`}
            >
              {t('animation.currentRequest')}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ApiAnimation;
