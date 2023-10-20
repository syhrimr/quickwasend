# Overview

![QuickWhatsApp's logo](https://cdn.discordapp.com/attachments/1161166907265777674/1161166987628662797/qwas.png?ex=65375007&is=6524db07&hm=6f23af0e8c18cd9ef5b232c12374c9185962aaedf9377c4097a9cd65fa4a1b8f&)

**QuickWhatsAppSend** is a shortcut for chatting with WhatsApp without saving any phone number to your contact.

## Background

I'm a type of person that rarely save a number to my phone contact, especially to only used once number. When using WhatsApp, you have to save the person number first before chatting them and that's kind of issue for me.

For a while, I've been used a shortcut through WhatsApp API URL by copy paste a number to `phone` query then fix the number format to fit in before chatting without saving a number. Somehow this practice still need more steps to do.

By doing this struggle inspired me to build an app for a shortcut optimize the steps 🤩. It just by copy paste a number and click one button to start chatting in WhatsApp.

## Used API

> > This app only request to one API endpoint of [ipgregistry.co](https://ipregistry.co/) to get IP location data to validate your country phone number. For the rest, there is no API request to any server to store any phone number from your input.

#### Get location data

```http
  GET /
```

| Parameter | Type     | Description                                                              |
| :-------- | :------- | :----------------------------------------------------------------------- |
| `key`     | `string` | **Required**. Your API key from [ipgregistry.co](https://ipregistry.co/) |

Please place the API Key value in `.env` file.
