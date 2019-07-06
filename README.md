# MDrive
A purpose built file uploading website, intended for personal use.

This project was built as part of my Medium article series, "Cloud Storage is Broken. Here’s How I Built My Own." [you can read the first installation here](https://medium.com/@kieranmaher13/cloud-storage-is-broken-heres-how-i-built-my-own-90b94a0fe180).

## Requirements

For development, you will only need Node.js and a node global package installed in your environement, as well as a nosql database such as MongoDB installed locally or hosted.

---

## Install

    $ git clone https://github.com/kmaher9/mdrive
    $ cd mdrive/backend
    $ npm install
    [open second terminal]
    $ cd mdrive/frontend
    $ npm install

## Configure app

Open `mdrive/backend/server.js` then edit the following line 12:

    const secret    = 'mdrive-secret'

To be your own custom secret for sessions.

Finally you need to create a blank folder at the root named "Uploads". So your structure should sit like

    mdrive/frontend
    mdrive/backend
    mdrive/uploads

## Running the project 

    $ cd backend
    $ npm run serve
    
    [open second terminal]
    
    $ cd frontend
    $ npm run serve

## Simple build for production

    $ [to be added]
