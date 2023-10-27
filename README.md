imageID is an AI-powered Angular+ElectronJS based image identification tool

![The interface of imageID](/src/assets/images/imageIDInterface.PNG "Interface"){: .shadow}

## Notes

ImageID uses Google Cloud Vision to identify the following features:

- Landmarks, Logos, Labels, Localized Objects, SafeSearch, Image Properties and Web Detection

Results can be exported either as JSON or XML.

To use this application, you will need to provide your own Google Cloud Vision credentials.

More detailed information can be read in the [documentation](/src/assets/docs/Documentation.pdf)

## Tech Stack

- Angular _16.2_ + Typescript _5.1.3_
- Electron _26.3.0_ + Electron-Store _8.1.0_
- Google Cloud Vision _4.0.2_
- _see more dependencies in package-lock.json file_
