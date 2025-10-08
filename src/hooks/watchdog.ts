import { sendMessage } from '../lib';
import { useAuth } from '../redux/slices/auth/hooks';
import { useConfig } from '../redux/slices/config/hooks';
import { useSettings } from '../redux/slices/settings/hooks';
import { useDevice } from './';

export const useWatchdog = () => {
  const { slackWebhook, buildForRelease, gatewayBaseUrl } = useConfig();
  const { tokenPayload } = useAuth();
  const { deviceId, deviceName, appVersion, model } = useDevice();
  const { env } = useSettings();

  const watch = (subject: string, message: any, isError?: boolean) => {
    const timestamp = new Date().toISOString();
    const icon = isError ? '❌' : '👉';
    const context = {
      env,
      appVersion,
      model,
      deviceId,
      deviceName,
      gatewayBaseUrl: gatewayBaseUrl || '❌ missing!',
      sessionId: tokenPayload?.jwi,
    };
    const title = `*${subject}*`;
    const msg = `\`\`\`${JSON.stringify(
      {
        context,
        message,
      },
      null,
      4,
    )}\`\`\``;
    const content = `
${icon} [${timestamp}] ${title}
${msg}`;
    sendMessage(slackWebhook, content);
  };

  const debug = (subject: string, message: any, isError?: boolean) => {
    if (buildForRelease) return;
    watch(subject, message, isError);
  };

  return { watch, debug };
};
