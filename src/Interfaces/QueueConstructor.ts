import {
    AudioPlayer,
    AudioResource,
    PlayerSubscription,
    VoiceConnection,
} from "@discordjs/voice";

export interface QueueConstructor {
    player: AudioPlayer;
    radio_url: string;
    volume: number;
    subscription: PlayerSubscription;
    connection: VoiceConnection;
    resource: AudioResource | undefined;
    radio_name: string;
}
