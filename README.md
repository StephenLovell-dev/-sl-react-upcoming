# react-upcoming
React Upcoming
This is a demo website of a simple React based 16:9 TV overlay using HTML5 graphics.
text 6
Page Layout
The page is laid out into three vertical segments, top middle and bottom.

The top segment is subdivided horizontally into left, middle and right.

Left and right segments have optional demonstration graphical elements.

The middle segment is currently used to display the Now > Next > Later data.

The bottom segment is unused at the moment.

Customisation using url parameters
DoG customisation
The left and right DoG items are disabled by default. Enable them with tl=yes and/or tr=yes url parameters.

Now/Next customisation
The Now/Next feature uses the Dazzler Now/Next api which is experimental. Other APIs can be plumbed in.

It can be configured with the following url parameters:

- **sid** specifies the channel to retrieve data from. if not present, 'History_Channel' is used
- **env** can be 'test' or 'live', defaults to 'test'
- **region** the AWS region the channel is running in, defaults to eu-west-1
- **minDuration** is the minimum duration of a programme to be included in the now next display, as an ISO 8601 duration. Default 'PT2M'.
- **timeson** can be used to add upcoming time strings to the Now, Next and Later text strings.

The following parameters can be added to the url, for page load time and speed profiling:

- **dummy** This parameter can be used to load in dummy upcoming data instead of calling the now/next api. Can be set to 0 or 1, defaults to 0. 
- **ddelay** This parameter can be used to delay the call to fetch data, by default it is set to 0.  Set to a millisecond value to delay the loading of the dummy data e.g. ddelay=600

Further customisation
The file App.js contains all the logic for the programme. It can be modified to change the styling of the Now/Next information or the DoG urls or any element of the page.

These defaults are hard coded:

The now next lambda is called once when the page is loaded. When the lamabda response has been processed to generate the Now>Next>Later messages the animation of the page will start.

Use the following variables in the App function in App.js to turn on/off backgrounds and gradients when debugging locally.

  // localTesting will apply gradients to the parent box so text is visible when testing locally.
  const localTesting = true;
  
  // demo will add a parent image so interstitial is displayed in front of the image when demoing/testing locally.
  const demo = false;


TODO: The text elements need to shift up and down as each of it's sibling elements is scaled.  