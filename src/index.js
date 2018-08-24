/* eslint-disable no-console */
import modeSwitchInit from './components/modeswitch/modeSwitch';
import personFinderInit from './components/personFinder/personFinder';
import SERVER_URL from './constants/server-url';
import './components/siteFinder/siteFinder';
import './components/addSite/addSite';

const init = async () => {
    await chayns.ready;

    console.info('ServerUrl for current environment:', SERVER_URL);

    // initialise a Modeswitch
    modeSwitchInit();

    // start Personfinder
    personFinderInit();
};

init();
