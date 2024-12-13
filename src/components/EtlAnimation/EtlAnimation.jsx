import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import DataFlow from './DataFlow';

const EtlAnimation = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [isPlaying, setIsPlaying] = useState(true);
  const [showError, setShowError] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [pipelineDetails, setPipelineDetails] = useState(null);

  const etlSteps = [
    {
      id: 'extract',
      title: t('etl.extract.title'),
      description: t('etl.extract.description'),
      details: {
        sources: [
          {
            type: 'PostgreSQL',
            table: 'sales_transactions',
            query: 'SELECT * FROM sales_transactions WHERE date >= $1',
            parameters: ['2024-01-01'],
            estimatedRows: '1.2M'
          },
          {
            type: 'MongoDB',
            collection: 'customer_interactions',
            query: '{ date: { $gte: ISODate("2024-01-01") } }',
            estimatedDocs: '850K'
          },
          {
            type: 'S3',
            bucket: 'raw-data',
            files: ['logs/*.parquet', 'metrics/*.json'],
            totalSize: '2.8GB'
          }
        ],
        performance: {
          parallelJobs: 3,
          batchSize: '10000',
          readThroughput: '15MB/s'
        },
        monitoring: {
          activeConnections: 5,
          queuedJobs: 2,
          memoryUsage: '45%'
        }
      }
    },
    {
      id: 'transform',
      title: t('etl.transform.title'),
      description: t('etl.transform.description'),
      details: {
        operations: [
          {
            type: 'Data Cleaning',
            steps: [
              'Remove duplicate records',
              'Handle NULL values',
              'Standardize date formats',
              'Validate data types'
            ]
          },
          {
            type: 'Data Enrichment',
            steps: [
              'Geocoding addresses',
              'Currency conversion',
              'Customer segmentation',
              'Sentiment analysis'
            ]
          },
          {
            type: 'Aggregations',
            steps: [
              'Daily sales summaries',
              'Customer behavior metrics',
              'Product performance stats',
              'Regional analysis'
            ]
          }
        ],
        metrics: {
          processedRecords: '2.05M',
          invalidRecords: '1.2K',
          transformationTime: '45min',
          cpuUtilization: '78%'
        },
        quality: {
          completeness: '99.8%',
          accuracy: '99.9%',
          consistency: '99.7%'
        }
      }
    },
    {
      id: 'load',
      title: t('etl.load.title'),
      description: t('etl.load.description'),
      details: {
        destinations: [
          {
            type: 'Data Warehouse',
            target: 'Snowflake',
            schema: 'analytics_prod',
            tables: ['fact_sales', 'dim_customers'],
            loadStrategy: 'Incremental'
          },
          {
            type: 'Data Lake',
            target: 'S3',
            path: 'processed/2024/Q1',
            format: 'Parquet',
            partitioning: ['date', 'region']
          },
          {
            type: 'Cache',
            target: 'Redis',
            keyPattern: 'analytics:*',
            ttl: '24h'
          }
        ],
        performance: {
          writeSpeed: '25MB/s',
          compressionRatio: '4.2:1',
          concurrentLoads: 3
        },
        validation: {
          rowCounts: 'Matched',
          checksums: 'Verified',
          constraints: 'Enforced'
        }
      }
    }
  ];

  useEffect(() => {
    if (etlSteps[currentStep]) {
      setPipelineDetails(etlSteps[currentStep].details);
    }
  }, [currentStep]);

  useEffect(() => {
    let timer;
    if (isPlaying && !showError) {
      timer = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % etlSteps.length);
      }, 4000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, showError]);

  const renderDetails = () => {
    if (!pipelineDetails) return null;

    return (
      <motion.div
        className="rounded-md bg-gray-100 p-4 dark:bg-gray-800 text-sm h-full overflow-y-auto"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {etlSteps[currentStep].id === 'extract' && pipelineDetails.sources && (
              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Data Sources:</div>
                  {pipelineDetails.sources.map((source, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="rounded-md border border-gray-200 p-2 dark:border-gray-700"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-blue-600 dark:text-blue-400">{source.type}</span>
                        {source.estimatedRows && (
                          <span className="text-xs text-gray-500">~{source.estimatedRows} rows</span>
                        )}
                        {source.estimatedDocs && (
                          <span className="text-xs text-gray-500">~{source.estimatedDocs} docs</span>
                        )}
                        {source.totalSize && (
                          <span className="text-xs text-gray-500">{source.totalSize}</span>
                        )}
                      </div>
                      <div className="mt-1 font-mono text-xs text-gray-600 dark:text-gray-400">
                        {source.query && <div>{source.query}</div>}
                        {source.files && <div>{source.files.join(', ')}</div>}
                      </div>
                    </motion.div>
                  ))}
                </div>
                {pipelineDetails.performance && (
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Performance:</div>
                    {Object.entries(pipelineDetails.performance).map(([key, value], index) => (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex items-center space-x-2 pl-2 text-xs"
                      >
                        <span className="font-medium text-gray-600 dark:text-gray-400">{key}:</span>
                        <span className="text-gray-600 dark:text-gray-400">{value}</span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {etlSteps[currentStep].id === 'transform' && pipelineDetails.operations && (
              <div className="space-y-3">
                <div className="space-y-2">
                  {pipelineDetails.operations.map((operation, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="rounded-md border border-gray-200 p-2 dark:border-gray-700"
                    >
                      <div className="mb-1 font-medium text-purple-600 dark:text-purple-400">
                        {operation.type}
                      </div>
                      <div className="space-y-1">
                        {operation.steps.map((step, stepIndex) => (
                          <motion.div
                            key={stepIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 + stepIndex * 0.05 }}
                            className="flex items-center space-x-2 text-xs"
                          >
                            <span className="text-gray-600 dark:text-gray-400">• {step}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
                {pipelineDetails.metrics && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="text-xs text-gray-500 dark:text-gray-400">Metrics:</div>
                      {Object.entries(pipelineDetails.metrics).map(([key, value], index) => (
                        <motion.div
                          key={key}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className="flex items-center space-x-2 pl-2 text-xs"
                        >
                          <span className="font-medium text-gray-600 dark:text-gray-400">{key}:</span>
                          <span className="text-gray-600 dark:text-gray-400">{value}</span>
                        </motion.div>
                      ))}
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-gray-500 dark:text-gray-400">Quality:</div>
                      {Object.entries(pipelineDetails.quality).map(([key, value], index) => (
                        <motion.div
                          key={key}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className="flex items-center space-x-2 pl-2 text-xs"
                        >
                          <span className="font-medium text-gray-600 dark:text-gray-400">{key}:</span>
                          <span className="text-gray-600 dark:text-gray-400">{value}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {etlSteps[currentStep].id === 'load' && pipelineDetails.destinations && (
              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Target Systems:</div>
                  {pipelineDetails.destinations.map((dest, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="rounded-md border border-gray-200 p-2 dark:border-gray-700"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-green-600 dark:text-green-400">{dest.type}</span>
                        <span className="text-xs text-gray-500">{dest.target}</span>
                      </div>
                      <div className="mt-1 space-y-1 text-xs text-gray-600 dark:text-gray-400">
                        {dest.schema && <div>Schema: {dest.schema}</div>}
                        {dest.tables && <div>Tables: {dest.tables.join(', ')}</div>}
                        {dest.path && <div>Path: {dest.path}</div>}
                        {dest.format && <div>Format: {dest.format}</div>}
                        {dest.partitioning && <div>Partitioning: {dest.partitioning.join(', ')}</div>}
                        {dest.keyPattern && <div>Key Pattern: {dest.keyPattern}</div>}
                        {dest.ttl && <div>TTL: {dest.ttl}</div>}
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Performance:</div>
                    {Object.entries(pipelineDetails.performance).map(([key, value], index) => (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex items-center space-x-2 pl-2 text-xs"
                      >
                        <span className="font-medium text-gray-600 dark:text-gray-400">{key}:</span>
                        <span className="text-gray-600 dark:text-gray-400">{value}</span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Validation:</div>
                    {Object.entries(pipelineDetails.validation).map(([key, value], index) => (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex items-center space-x-2 pl-2 text-xs"
                      >
                        <span className="font-medium text-gray-600 dark:text-gray-400">{key}:</span>
                        <span className="text-gray-600 dark:text-gray-400">{value}</span>
                      </motion.div>
                    ))}
                  </div>
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
        <h2 className="text-3xl font-bold gradient-text">{t('etl.title')}</h2>
        <h3 className="text-xl text-gray-600 dark:text-gray-300">{t('etl.subtitle')}</h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">{t('etl.description')}</p>
      </div>

      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 min-h-[1200px]">
        <div className="flex items-center justify-between mb-8">
          <div>
            <motion.h3
              key={`title-${currentStep}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-lg font-semibold text-gray-900 dark:text-white"
            >
              {etlSteps[currentStep].title}
            </motion.h3>
            <motion.p
              key={`desc-${currentStep}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-gray-600 dark:text-gray-400"
            >
              {etlSteps[currentStep].description}
            </motion.p>
          </div>
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPlaying(!isPlaying)}
              className="rounded-md bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isPlaying ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                )}
              </svg>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowError(!showError)}
              className={`rounded-md p-2 ${
                showError
                  ? 'bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-800/30'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
              }`}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </motion.button>
          </div>
        </div>

        <div className="relative h-[250px] w-full rounded-lg bg-white p-4 shadow-lg dark:bg-gray-900 mb-8">
          <DataFlow
            currentStep={currentStep}
            showError={showError}
            isPlaying={isPlaying}
          />
        </div>

        <div className="h-[700px] overflow-y-auto">
          {renderDetails()}
        </div>
      </div>
    </div>
  );
};

export default EtlAnimation;
