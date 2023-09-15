# Nocred: Secure E-Portal Access Without Credentials.

##### Securely Grant other students access to your noun elearn portal without sharing credentials.

# First and foremost

## Why I built this? 🤔

Many Noun students I've met have faced issues when they share their eLearn portal login details with other students or vendors. They do this to solve problems, access Tutor Marked Assessments (TMA), or for other reasons.

As a result, some students have had their login details stolen, and others have experienced unauthorized access to their assessments. Some have even entered exam halls only to find a message saying "Exam Submitted by you!" without their knowledge, causing distress and regret later on.

Recognizing this problem, I took the initiative to create a secure application. This app allows students to access the eLearn platform of their peers without having to share their matriculation number or password with anyone else.

## Is This Secure? 🧐

To some extent, **Yes**. The generated link has an expiration period, which can be set to 1 day, 1 week, or 3 weeks, as indicated in the extension.

Additionally, the session data collected from the logged-in user is securely encrypted using the [AES](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) encryption algorithm and a secret key stored on the server before storage. However, it's important to note that even with these security measures, there is still a potential risk. If you grant access to your portal and someone copies your logged-in session ID, they could potentially use it later, especially if they have some technical knowledge.

As a precaution, I would recommend generating a nocred URL with a 1-day expiration to minimize the risk of the link being used beyond the intended timeframe. **Use at your own risk**.

## Get Started

Using this extension is as easy as possible. All you have to do is follow the instruction below:

**Download Extension**: Nocred extension can be downloaded from this [github release](https://github.com/Benrobo/nocred/archive/refs/tags/nocred-extension-v1.0.zip). After downloading, Open your default PC browser, for me, it's Brave. Navigate to the puzzle icon at the top right corner of the browser, click on that icon, and select **Managed Extensions** as seen in the picture below.

![Image](https://raw.githubusercontent.com/Benrobo/nocred/main/md-assets/1.png)

**Load Downloaded Extension**: Navigate to the section where it says **Load unpacked** as shown in the image below. You also need to make sure **Developer mode** is enabled.

![Image](https://raw.githubusercontent.com/Benrobo/nocred/main/md-assets/2.png)

**Upload Downloaded Assets**: You would be prompted to upload the downloaded extension assets. Note!! You have to unzip the assets before uploading to Chrome. After that, simply select the extracted extensions folder as seen below.

![Image](https://raw.githubusercontent.com/Benrobo/nocred/main/md-assets/3.png)

**View Extension**: Once it has been uploaded and loaded correctly without errors, it should look as the picture shown below.

![Image](https://raw.githubusercontent.com/Benrobo/nocred/main/md-assets/4.png)

**Pin Extension**: To make the extension more accessible, you can pin the extension by following the picture guide below.

![Image](https://raw.githubusercontent.com/Benrobo/nocred/main/md-assets/5.png)

**Use Extension**: If all instructions have been followed correctly, the extension should be available to use. Simply navigate to your Noun e-learn platform. You must be logged in for this to work correctly.

![Image](https://raw.githubusercontent.com/Benrobo/nocred/main/md-assets/6.png)

> The recipient at which nocred link would be sent to also need to have the extension available for use, otherwise the image below would be shown.

![Image](https://raw.githubusercontent.com/Benrobo/nocred/main/md-assets/7.png)
