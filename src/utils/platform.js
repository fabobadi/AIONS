import { Platform } from 'react-native';

/**
 * Check the current platform/device
 *
 * Usage:
 * import Platform from '../../utils/platform';
 *
 * if (Platform.iOS) {
 *   // ...
 * }
 */

export default {
  iOS: (Platform.OS === 'ios'),
  Android: (Platform.OS === 'android'),
  Version: Platform.Version,
};
