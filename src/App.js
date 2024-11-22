import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography';
import { Temporal } from 'temporal-polyfill'
import Image from './livein19202.png';
import './index.css';
import Slide from '@mui/material/Slide';

//Performance testing
// import { data } from './test_data/nexts'

// eslint-disable-next-line no-unused-vars
const urls = {
  test: 'https://jfayiszondlcqngo5vavioz6bq0ibxen.lambda-url.eu-west-1.on.aws/',
  live: 'https://ypdjc6zbc5cnvth24lk3mm45sm0qtgps.lambda-url.eu-west-1.on.aws'
};

const oneHour = 60 * 60;

function Decodeuint8arr(uint8array){
  return new TextDecoder("utf-8").decode(uint8array);
}

function titlefor(o, rel) {
  return o.title_hierarchy?.titles?.find((t) => t.inherited_from?.link?.rel === `pips-meta:${rel}`)?.title?.$;
}

function gettitles(item) {
  const b = titlefor(item, 'brand');
  const s = titlefor(item, 'series');
  const e = item.title_hierarchy?.titles?.find((t) => !t.inherited_from)?.title?.$;
  const t = b ? `${b}` : '';
  if (s) {
    return {
      episodeTitle: `${e}`,
      brandTitle: `${t}`,
      seriesTitle: `${s}`,
    };
  }
  return {
    episodeTitle: `${e}`,
    brandTitle: `${t}`,
    seriesTitle: '',
  };
}

function chooseNexts(next, minDuration) {
  const ok = (next || []).filter((e) => {
    if (e?.duration && e?.title) {
      return Temporal.Duration.compare(minDuration, Temporal.Duration.from(e.duration)) < 0;
    }
    return false;
  });
  if (ok.length > 0) {
    return ok;
  }
  return { title: '' };
}

function UpComingItem({ item, on, onDelay, noOff, steady }) {
  console.log(`UpcomingItem ${steady}`);
  const [focused, setFocused] = useState(on);
  useEffect(() => {
    if (canShow(item) && (steady)) {
      const timeOutList = [];
      console.log(`focused ${focused} onDelay ${onDelay}`);
      const offDelay = onDelay + 3000;
      console.log(`focused ${focused} offDelay ${offDelay}`);
      const focusOn = setTimeout(() => {
        (async () => {
          console.log('Firing focus On!');
          setFocused(true);
        })();
      }, onDelay);
      timeOutList.push(focusOn);
      if(!noOff) {
        const focusOff = setTimeout(() => {
          (async () => {
            console.log('Firing focus Off!');
            setFocused(false);
          })();
        }, offDelay);
        timeOutList.push(focusOff);
      }
      return () => {
        for (let i = 0; i < timeOutList.length; i += 1) {
          clearTimeout(timeOutList[i]);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onDelay])

  const containerRef = useRef(null);
  function canShow(item) {
    if ((item)) {
      return ((item) && (item.starting || item.brandTitle || item.seriesTitle));
    }
    return false;
  }
  return (
    <Box className={focused ? 'itemFocused' : 'itemNormal'}>
      <Box
        sx={{ overflow: 'hidden', flexGrow: 1, flexShrink: 0 }}
        ref={containerRef}
        key={item.starting + item.brandTitle + (item.seriesTitle ? `${item.seriesTitle}: ${item.episodeTitle}` : item.episodeTitle)}
        style={{ paddingTop: '18px', paddingBottom: '18px' }}
      >
        <Slide direction="up"
          in={true} mountOnEnter unmountOnExit
          container={containerRef.current}
          onEntered={() => console.log('slide entered')}
          addEndListener={() => console.log('slide addEndListener')}
          timeout={1000}>
          <div>
            {item.starting ? <Box>
              <Typography
                fontFamily={'BBCReithSans_W_Md'}
                fontSize={'1.7rem'}>{item.starting}
              </Typography>
            </Box> : ''}
            {item.brandTitle ?
              <Box>
                <Typography
                  fontFamily={'BBCReithSans_W_Bd'}
                  fontSize={'2.2rem'}>{item.brandTitle}</Typography>
              </Box> : ''}
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignContent: 'flex-start',
              }}
            >
              <Typography
                fontFamily={'BBCReithSans_W_Md'}
                fontSize={'1.7rem'}>{item.seriesTitle ? `${item.seriesTitle}: ${item.episodeTitle}` : item.episodeTitle}</Typography>
            </Box>
          </div>
        </Slide>
      </Box >
    </Box>
  )
}

function UpComing({ upcomingitems, steady }) {
  console.log(`Upcoming ${steady}`);
  return (
    <Box sx={{
      width: 'auto', height: '620px',
      display: 'grid', gridTemplateRows: '1fr 1fr 1fr', paddingLeft: '5%', paddingbottom: '5%'
    }}>
      <Box></Box>
      <Box>
        {steady ? upcomingitems.map((item, index) => {
          return (
            <UpComingItem key={index} item={item} on={index === 0} noOff={upcomingitems.length -1 === index} onDelay={index * 3000} steady={steady} />
          )
        }) : <></>}
      </Box>
      <Box></Box>
    </Box>
  );
}

function Middle({ upcomingitems, steady }) {
  const containerRef = React.useRef(null);

  return (
    <Box sx={{ overflow: 'hidden' }} ref={containerRef}>
      <Box display='flex' alignItems='center'>
        <UpComing upcomingitems={upcomingitems} steady={steady} />
      </Box>
    </Box>
  );
}

function TopLeft({ show }) {
  if (show) {
    return '';//<img src={logo} alt='CBeebies' />;
  }
  return '';
}

function TopRight({ show }) {
  if (show) {
    return <img alt='bounce' src='https://upload.wikimedia.org/wikipedia/commons/1/14/Animated_PNG_example_bouncing_beach_ball.png' />;
  }
  return '';
}
export default function App(params) {
  const styling = params.styling || 'grownup';
  const [on, setOn] = useState(false);
  const [steady, setSteady] = useState(false);
  const [next, setNext] = useState([]);
  const [upcomingitems, setUpcomingItems] = useState([]);

  const env = params.env || 'test';
  const sid = params.sid || 'steve_sid';
  const region = params.region || 'eu-west-1';
  const useDummyData = params.dummy || 0; // dummy can be set to 0 or 1
  const dataDelay = params.ddelay || 0; // dummyDelay should be set in milliseconds e.g. dummyDelay=400 
  const showTimes = params.timeson || 0; // Add time element to the Now/Next/Later labels
  const nowThenLater = ['Now', 'Next', 'Later'];
  const minDuration = Temporal.Duration.from(params.minDuration || 'PT2M');
  // localTesting will apply gradients to the parent box so text is visible when testing locally.
  const localTesting = false;
  // demo will add a parent image so interstitial is displayed in front of the image when demoing/testing locally.
  const demo = false;

  useEffect(() => {
    if (upcomingitems.length > 0) {
      console.log('First show setOn(true)')
      setOn(true);
    }
  }, [upcomingitems])

  useEffect(() => {
    if ((next) && (next.length > 0)) {
      const items = [];
      if (next.length > 0) {
        let itemsToAdd = 3;
        let addedCount = 0;
        let canAdd = true;
        while (canAdd) {
          // console.log('next[addedCount]', next[addedCount])
          let item = gettitles(next[addedCount]);
          if (nowThenLater[0]) {
            item.starting = nowThenLater[0];
            nowThenLater.shift();
          }
          if (showTimes) {
            const start = Date.parse(next[addedCount].start);
            const startTime = new Date(next[addedCount].start).toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit', hour12: true });
            const secondsToNext = Math.round((start - (new Date())) / 1000);
            if (secondsToNext < 60) {
              if ((secondsToNext >= 1) && (secondsToNext < 2)) {
                item.starting = `${item.starting} in 1 second`;
              } else if (secondsToNext >= 2) {
                item.starting = `${item.starting} in ${secondsToNext} seconds`;
              }
            } else if (secondsToNext < oneHour) {
              const minutesToNext = Math.round(secondsToNext / 60);
              item.starting = `${item.starting} in ${minutesToNext} ${minutesToNext === 1 ? 'minute' : 'minutes'}`;
            } else {
              item.starting = `${item.starting} at ${startTime}`;
            }
          }
          items.push(item);
          addedCount += 1;
          canAdd = items.length < itemsToAdd && items.length < next.length;
        }
      }
      console.log('setting upcoming items');
      setUpcomingItems(items);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [next]);

  // On page load useEffect
  useEffect(() => {
    if (next.length === 0) {
      const tm = setTimeout(() => {
        (async () => {
          console.log(`about to fetch (use dummy data set to ${useDummyData} ${dataDelay}`);
          if (!useDummyData) {
            const r = await fetch(`${urls[env]}/${sid}/${region}?schedule_only=1`);
            if (r.ok) {
              const data = await r.json()
              // console.log(`got some data ${JSON.stringify(data)}`);
              console.log(`got some data ${data}`);
              setNext(chooseNexts(data.next, minDuration));
            }
          } else {
            //local file fetch
            const r = await fetch(`./channels/${sid}.json`, {mode: 'no-cors'})

            if (r.ok) {
              console.log(r.text)
              console.log(r.body);
              const reader = r.body.getReader();
              const chunks = [];
              let reading = true;
              while (reading) {
                const { done, value } = await reader.read();
                if (done) {
                  // Do something with last chunk of data then exit reader
                  if (value)
                    chunks.push(value);
                  reading = !done;
                  break;
                }
                // Otherwise do something here to process current chunk
                if (value)
                  chunks.push(value);
              }
              console.log(chunks);
              let data;
              const decoded = Decodeuint8arr(chunks[0]);
              try {
                // Convert the buffer to a string
                data = JSON.parse(decoded);
                console.log(`got some data ${data}`);
                setNext(chooseNexts(data.next, minDuration));
              } catch(e) {
                console.log(`ERROR: ${sid} data isn't JSON i.e. ${decoded}`);
                setNext(chooseNexts([], minDuration));
              }
            }
          }
        })();
      }, dataDelay);
      return () => clearTimeout(tm);
    }
  });

  useEffect(() => {
    console.log(`steady is ${steady}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steady])

  return (
    <Paper elevation={0} sx={
      demo === true ?
        { backgroundImage: `url(${Image})`, backgroundRepeat: 'round' }
        : { backgroundColor: 'transparent' }}>
      <Fade in={on} timeout={1} addEndListener={() => setSteady(true)}>
        <Box
          sx={
            localTesting ? styling === 'grownup' ?
              {
                height: '720px', width: 'auto', color: 'white',
                background: 'linear-gradient(to right, rgba(15, 15, 15, .8), rgba(245, 73, 151, .8))',
                display: 'grid', gridTemplateRows: '50px 620px 50px', gridTemplateColumns: '1fr', marginbottom: '100px'
              }
              : {
                height: '720px', width: 'auto', color: 'black',
                background: 'linear-gradient(to right, rgba(255, 255, 255, .9), rgba(255, 255, 255, .9))',
                display: 'grid', gridTemplateRows: '50px 620px 50px', gridTemplateColumns: '1fr', marginbottom: '100px'
              } : styling === 'grownup' ? {
                height: '720px', width: 'auto', color: '#ededed',
                display: 'grid', gridTemplateRows: '50px 620px 50px', gridTemplateColumns: '1fr', marginbottom: '100px'
              }
              : {
                height: '720px', width: 'auto', color: 'black',
                display: 'grid', gridTemplateRows: '50px 620px 50px', gridTemplateColumns: '1fr', marginbottom: '100px'
              }
          }
        >
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
            <Box><TopLeft show={params.tl} /></Box>
            <Box>
            </Box>
            <Box sx={{ display: 'block', marginLeft: 'auto' }}><TopRight show={params.tr} /></Box>
          </Box>
          <Middle upcomingitems={upcomingitems} styling={styling} steady={steady} />
          <Box></Box>
        </Box>
      </Fade>
    </Paper>
  );
}