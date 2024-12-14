import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import DataFlow from './DataFlow';
import { FaServer, FaDesktop, FaPause, FaPlay, FaExclamationTriangle } from 'react-icons/fa';

const ApiAnimation = () => {
  const { translate } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(true);
  const [forceError, setForceError] = useState(false);
  const [currentRequest, setCurrentRequest] = useState('GET');
  const [currentChallenge, setCurrentChallenge] = useState(0);

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
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentChallenge((prev) => (prev + 1) % challenges.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, challenges.length]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleError = () => setForceError(!forceError);

  const requestTypes = ['GET', 'POST', 'PUT', 'DELETE'];
  const requestColors = {
    GET: '#4CAF50',
    POST: '#2196F3',
    PUT: '#FF9800',
    DELETE: '#f44336'
  };

  const handleRequestChange = (type) => {
    setCurrentRequest(type);
  };

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white p-2 sm:p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Control Panel */}
          <div className="lg:w-1/4 bg-gray-800 p-3 sm:p-4 rounded-lg">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">{translate('apiAnimation.currentRequest')}</h3>
            <div className="grid grid-cols-2 gap-2 mb-3 sm:mb-4">
              {requestTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => handleRequestChange(type)}
                  className={`p-1.5 sm:p-2 text-sm sm:text-base rounded ${
                    currentRequest === type ? 'bg-blue-600' : 'bg-gray-700'
                  } hover:bg-blue-500 transition-colors`}
                  style={{
                    borderColor: requestColors[type],
                    borderWidth: '2px'
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
            <div className="flex gap-2 mb-3 sm:mb-4">
              <button
                onClick={togglePlay}
                className="flex-1 flex items-center justify-center gap-1 sm:gap-2 bg-gray-700 p-1.5 sm:p-2 rounded hover:bg-gray-600 text-sm sm:text-base"
              >
                {isPlaying ? <FaPause className="text-sm sm:text-base" /> : <FaPlay className="text-sm sm:text-base" />}
                <span className="hidden sm:inline">{translate(isPlaying ? 'apiAnimation.pause' : 'apiAnimation.play')}</span>
              </button>
              <button
                onClick={toggleError}
                className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded text-sm sm:text-base ${
                  forceError ? 'bg-red-600' : 'bg-gray-700'
                } hover:bg-red-500`}
              >
                <FaExclamationTriangle className="text-sm sm:text-base" />
                <span className="hidden sm:inline">{translate('animation.error.forceError')}</span>
              </button>
            </div>
          </div>

          {/* Main Animation Area */}
          <div className="lg:w-3/4 bg-gray-800 p-3 sm:p-4 rounded-lg">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                <FaDesktop className="text-2xl" />
                <span>{translate('apiAnimation.client')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{translate('apiAnimation.server')}</span>
                <FaServer className="text-2xl" />
              </div>
            </div>
            
            <DataFlow
              isPlaying={isPlaying}
              forceError={forceError}
              requestType={currentRequest}
              requestColor={requestColors[currentRequest]}
            />
          </div>
        </div>

        {/* Challenges Section */}
        <div className="mt-8 bg-gray-800 p-3 sm:p-4 rounded-lg">
          <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
            {translate('apiAnimation.commonChallenges')}
          </h3>
          <motion.div
            key={currentChallenge}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-lg text-center p-4 bg-gray-700 rounded-lg"
          >
            {translate(`apiAnimation.challenges.${challenges[currentChallenge]}`)}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ApiAnimation;
