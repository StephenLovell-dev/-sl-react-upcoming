import React, { useState, useEffect, useRef } from 'react';
// import { css, keyframes } from "@emotion/react";
// import { useTheme } from "@mui/material/styles";
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography';
import { Temporal } from 'temporal-polyfill'
import Image from './livein19202.png';
import './index.css';
import Slide from '@mui/material/Slide';
import { SequenceAnimator } from 'react-sequence-animator';
import i00 from './images/intro/Chameleon_LT_IPP_Block_Opener_00000.png';
import i01 from './images/intro/Chameleon_LT_IPP_Block_Opener_00001.png';
import i02 from './images/intro/Chameleon_LT_IPP_Block_Opener_00002.png';
import i03 from './images/intro/Chameleon_LT_IPP_Block_Opener_00003.png';
import i04 from './images/intro/Chameleon_LT_IPP_Block_Opener_00004.png';
import i05 from './images/intro/Chameleon_LT_IPP_Block_Opener_00005.png';
import i06 from './images/intro/Chameleon_LT_IPP_Block_Opener_00006.png';
import i07 from './images/intro/Chameleon_LT_IPP_Block_Opener_00007.png';
import i08 from './images/intro/Chameleon_LT_IPP_Block_Opener_00008.png';
import i09 from './images/intro/Chameleon_LT_IPP_Block_Opener_00009.png';
import i10 from './images/intro/Chameleon_LT_IPP_Block_Opener_00010.png';
import i11 from './images/intro/Chameleon_LT_IPP_Block_Opener_00011.png';
import i12 from './images/intro/Chameleon_LT_IPP_Block_Opener_00012.png';
import i13 from './images/intro/Chameleon_LT_IPP_Block_Opener_00013.png';
import i14 from './images/intro/Chameleon_LT_IPP_Block_Opener_00014.png';
import i15 from './images/intro/Chameleon_LT_IPP_Block_Opener_00015.png';
import i16 from './images/intro/Chameleon_LT_IPP_Block_Opener_00016.png';
import i17 from './images/intro/Chameleon_LT_IPP_Block_Opener_00017.png';
import i18 from './images/intro/Chameleon_LT_IPP_Block_Opener_00018.png';
import i19 from './images/intro/Chameleon_LT_IPP_Block_Opener_00019.png';
import i20 from './images/intro/Chameleon_LT_IPP_Block_Opener_00020.png';
import i21 from './images/intro/Chameleon_LT_IPP_Block_Opener_00021.png';
import i22 from './images/intro/Chameleon_LT_IPP_Block_Opener_00022.png';
import i23 from './images/intro/Chameleon_LT_IPP_Block_Opener_00023.png';
import i24 from './images/intro/Chameleon_LT_IPP_Block_Opener_00024.png';
import i25 from './images/intro/Chameleon_LT_IPP_Block_Opener_00025.png';
import i26 from './images/intro/Chameleon_LT_IPP_Block_Opener_00026.png';
import i27 from './images/intro/Chameleon_LT_IPP_Block_Opener_00027.png';
import i28 from './images/intro/Chameleon_LT_IPP_Block_Opener_00028.png';
import i29 from './images/intro/Chameleon_LT_IPP_Block_Opener_00029.png';
import i30 from './images/intro/Chameleon_LT_IPP_Block_Opener_00030.png';
import i31 from './images/intro/Chameleon_LT_IPP_Block_Opener_00031.png';
import i32 from './images/intro/Chameleon_LT_IPP_Block_Opener_00032.png';
import i33 from './images/intro/Chameleon_LT_IPP_Block_Opener_00033.png';
import i34 from './images/intro/Chameleon_LT_IPP_Block_Opener_00034.png';
import i35 from './images/intro/Chameleon_LT_IPP_Block_Opener_00035.png';
import i36 from './images/intro/Chameleon_LT_IPP_Block_Opener_00036.png';
import i37 from './images/intro/Chameleon_LT_IPP_Block_Opener_00037.png';
import i38 from './images/intro/Chameleon_LT_IPP_Block_Opener_00038.png';
import i39 from './images/intro/Chameleon_LT_IPP_Block_Opener_00039.png';
import i40 from './images/intro/Chameleon_LT_IPP_Block_Opener_00040.png';
import i41 from './images/intro/Chameleon_LT_IPP_Block_Opener_00041.png';
import i42 from './images/intro/Chameleon_LT_IPP_Block_Opener_00042.png';
import i43 from './images/intro/Chameleon_LT_IPP_Block_Opener_00043.png';
import i44 from './images/intro/Chameleon_LT_IPP_Block_Opener_00044.png';
import i45 from './images/intro/Chameleon_LT_IPP_Block_Opener_00045.png';
import i46 from './images/intro/Chameleon_LT_IPP_Block_Opener_00046.png';
import i47 from './images/intro/Chameleon_LT_IPP_Block_Opener_00047.png';
import i48 from './images/intro/Chameleon_LT_IPP_Block_Opener_00048.png';
import i49 from './images/intro/Chameleon_LT_IPP_Block_Opener_00049.png';
// import { styled } from '@mui/material/styles';
//Performance testing
import { data } from './test_data/nexts'

const introImages = [
  i00, i01, i02, i03, i04, i05, i06, i07, i08, i09,
  i10, i11, i12, i13, i14, i15, i16, i17, i18, i19,
  i20, i21, i22, i23, i24, i25, i26, i27, i28, i29,
  i30, i31, i32, i33, i34, i35, i36, i37, i38, i39,
  i40, i41, i42, i43, i44, i45, i46, i47, i48, i49,
];

const iplayerPink = '#f54996';

const urls = {
  test: 'https://jfayiszondlcqngo5vavioz6bq0ibxen.lambda-url.eu-west-1.on.aws/',
  live: 'https://ypdjc6zbc5cnvth24lk3mm45sm0qtgps.lambda-url.eu-west-1.on.aws'
};

const oneHour = 60 * 60;

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

function UpComingItem({ item, on, onDelay, steady }) {
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
      const focusOff = setTimeout(() => {
        (async () => {
          console.log('Firing focus Off!');
          setFocused(false);
        })();
      }, offDelay);
      timeOutList.push(focusOff);
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
      sx={{overflow: 'hidden', flexGrow: 1, flexShrink: 0 }}
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
            <UpComingItem key={index} item={item} on={index === 0} onDelay={index * 3000} steady={steady} />
          )
        }) : <></>}
      </Box>
      <Box></Box>
    </Box>
  );
}

// function convertISOTimeToMilliSeconds(inISOTime) {
//   const duration = Temporal.Duration.from(inISOTime);
//   return (duration.hours * 60 * 60 * 1000) + (duration.minutes * 60 * 1000) + (duration.seconds * 1000) + duration.milliseconds;
// }

function Middle({ params, upcomingitems, steady }) {
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

  const timerRef = useRef(null);

  const env = params.env || 'live';
  const sid = params.sid || 'History_Channel';
  const region = params.region || 'eu-west-1';
  const nowThenLater = ['Now', 'Then', 'Later'];
  const minDuration = Temporal.Duration.from(params.minDuration || 'PT2M');
  // localTesting will apply gradients to the parent box so text is visible when testing locally.
  const localTesting = true;
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
          console.log('about to fetch');
          // const r = await fetch(`${urls[env]}/${sid}/${region}`);
          // if (r.ok) {
          //   const data = await r.json()
          //   // console.log(`got some data ${JSON.stringify(data)}`);
          //   console.log(`got some data ${data}`);
          //   setNext(chooseNexts(data.next, minDuration));
          // }
          // /test_data/nexts
          //local file fetch
          // const r = await fetch(`/test_data/nexts.json`, {mode: 'no-cors'});
          // if (r.ok) {
          //   console.log(`r ${JSON.stringify(r)}`);
          //   const data = await r.json()
          //   // console.log(`got some data ${JSON.stringify(data)}`);
          //   console.log(`got some data ${data}`);
          //   setNext(chooseNexts(data.next, minDuration));
          // }
          //about to fake fetch
          setNext(chooseNexts(data.next, minDuration));
        })();

      }, 0);
      return () => clearTimeout(tm);
    }
  });



  useEffect(() => {
    console.log(`steady is ${steady}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steady])

  // useEffect(() => {
  //   // Clear the timeOut when the component unmounts
  //   return () => clearTimeout(timerRef.current);
  // }, []);

  // const pauseSequence = () => {
  //   setSteady(false);
  //   timerRef.current = setTimeout(() => setSteady(true), 5000);
  // }

  return (
    <Paper elevation={0} sx={
      demo === true ?
        { backgroundImage: `url(${Image})`, backgroundRepeat: 'round' }
        : { backgroundColor: 'transparent' }}>
      <Fade in={on} timeout={500} addEndListener={() => setSteady(true)}>
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
              {/* {steady ? <SequenceAnimator duration={3000} loop={steady} onSequenceEnd={() => pauseSequence()}>
                {introImages.map((im, index) => (<img key={index} src={im} alt='BBC' />))}
              </SequenceAnimator> : <></>} */}
            </Box>
            <Box sx={{ display: 'block', marginLeft: 'auto' }}><TopRight show={params.tr} /></Box>
          </Box>
          <Middle params={params} upcomingitems={upcomingitems} styling={styling} steady={steady} />
          <Box></Box>
        </Box>
      </Fade>
    </Paper>
  );
}