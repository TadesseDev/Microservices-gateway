import { Transform } from 'class-transformer';
import { IsEnum, IsNumber } from 'class-validator';

// NOTE: The notification_types and message_types are enums that are used to validate the data
export enum notification_types {
  promotion = 'promotion',
  deposit = 'deposit',
  withdraw = 'withdraw',
  event = 'event',
}
export enum message_types {
  text = 'text',
  text_with_image = 'text_with_image',
  text_with_media = 'text_with_media',
}

// NOTE: sending a successful notification includes passing the appropriate CreateNotificationDto, See the example below
export class CreateNotificationDto {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  telegram_id: number;
  user_id: string;
  @IsEnum(notification_types)
  notification_type: notification_types;
  @IsEnum(message_types)
  message_type: message_types;

  data: {
    text?: string;
    image?: string;
    media?: { media_url: string; media_type: string };
  };
}

/* NOTE: Sample data ti be used for sending/creating a notification
{
  "telegram_id": "656582808", // A valid id
  "user_id": "we will receive this",
  "notification_type": "promotion",
  "message_type": "text_with_media",
  "data": {"text": "This si the text content to be used as a caption", "image": "https://blog.hubspot.com/hs-fs/hubfs/parts-url_1.webp?width=1190&height=800&name=parts-url_1.webp", "media": {"media_type": "video", "media_url": "https://assets.mixkit.co/videos/preview/mixkit-a-lush-forest-with-ferns-and-death-leaves-on-the-50858-large.mp4"}}
}


Media types for test
https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf
https://assets.mixkit.co/videos/preview/mixkit-a-lush-forest-with-ferns-and-death-leaves-on-the-50858-large.mp4


*/
