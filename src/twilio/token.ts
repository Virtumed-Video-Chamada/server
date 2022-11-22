import twilio from 'twilio';
import { VideoGrant } from 'twilio/lib/jwt/AccessToken';

const AccessToken = twilio.jwt.AccessToken;

const generateToken = (config) => {
    return new AccessToken(
        config.twilio.accountSid,
        config.twilio.apiKey,
        config.twilio.apiSecret,
    );
};

const videoToken = (identity, room, config) => {
    let videoGrant: VideoGrant;
    if (typeof room !== 'undefined') {
        videoGrant = new VideoGrant({ room });
    } else {
        videoGrant = new VideoGrant();
    }
    const token = generateToken(config);
    token.addGrant(videoGrant);
    token.identity = identity;
    return token;
};

export default videoToken;
