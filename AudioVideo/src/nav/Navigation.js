import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Players from '../screen/Players';
import Audio from '../screen/Audio';
import Videos from '../screen/Videos';

const Navigation = createStackNavigator({
    Players: {
        screen: Players
    },
    Audio: {
        screen: Audio
    },
    Videos: {
        screen: Videos
    }
});

export default createAppContainer(Navigation);


