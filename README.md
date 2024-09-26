# react-upcoming
React Upcoming
This is a demo website of a simple React based 16:9 TV overlay using HTML5 graphics.
text 6
Page Layout
The page is laid out into three vertical segments, top middle and bottom.

The top segment is subdivided horizontally into left, middle and right.

Left and right segments have optional demonstration graphical elements.

The middle segment is currently unused.

The bottom segment is a single, full width item with now/next data.

Customisation using url parameters
DoG customisation
The left and right DoG items are disabled by default. Enable them with tl=yes and/or tr=yes url parameters.

Now/Next customisation
The Now/Next feature uses the Dazzler Now/Next api which is experimental. Other APIs can be plumbed in.

It can be configured with the following url parameters:

sid specifies the channel to retrieve data from. if not present, 'History_Channel' is used
env can be 'test' or 'live', defaults to 'live'
region the AWS region the channel is running in, defaults to eu-west-2
minDuration is the minimum duration of a programme to be included in the now next display, as an ISO 8601 duration. Default 'PT2M'.
(previewMinutes is the time before the start of the next programme when the next display will start to be shown, as integer minutes, default '2'.)
Further customisation
The file App.js contains all the logic for the programme. It can be modified to change the styling of the Now/Next information or the DoG urls or any element of the page.

These defaults are hard coded:

The now next lambda is called once when the page is loaded. When the lamabda response has been processed to generate the Now>Next>Later messages the animation of the page will start.

Use the following variables in the App function in App.js to turn on/off backgrounds and gradients when debugging locally.

  // localTesting will apply gradients to the parent box so text is visible when testing locally.
  const localTesting = true;
  
  // demo will add a parent image so interstitial is displayed in front of the image when demoing/testing locally.
  const demo = false;

TODO: There is a bug where the fade is being applied to the gradient instead of to the text as it slides up!

TODO: The text elements need to shift up and down as each of it's sibling elements is scaled.  