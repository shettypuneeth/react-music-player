const React = require('react/addons');
const {CSSTransitionGroup} = React.addons;

import Player from './player';

export default class MusicPlayer extends React.Component {
  constructor(props){
    super(props);		
  }

  render() {
    let songs =  [
      {
        id: "S1",
        image: "img/tanneanbaum.jpg",
        artist: "Dan Lerch",
        name: "O Tannenbaum",
        srcs: [
          {
            src: "media/O_Tannenbaum.mp3",
            type: "audio/mp3"
          }, {
            src: "media/O_Tannenbaum.ogg",
            type: "audio/ogg"
          }
      ]
  	  }, {
    		id: "S2",
    		image: "img/moonlight.jpg",
    		artist: "Kai Engel",
    		name: "Moonlight Reprise",
    		srcs: [
    		  {
    			src: "media/Moonlight_Reprise.mp3",
    			type: "audio/mp3"
    		  }, {
    			src: "media/Moonlight_Reprise.ogg",
    			type: "audio/ogg"
    		  }
  		  ]
  	  }, {
    		id: "S3",
    		image: "img/brokeforfree.jpg",
    		artist: "Night Owl",
    		name: "Broke For Free",
    		srcs: [
    		  {
      			src: "media/Broke_For_Free.mp3",
      			type: "audio/mp3"
    		  }, {
      			src: "media/Broke_For_Free.ogg",
      			type: "audio/ogg"
    		  }
    		]
    	  }, {
    		id: "S4",
    		image: "img/sunset.jpg",
    		artist: "Kai Engel",
    		name: "Sunset",
    		srcs: [
    		  {
      			src: "media/Sunset.mp3",
      			type: "audio/mp3"
    		  }, {
      			src: "media/Sunset.ogg",
      			type: "audio/ogg"
    		  }
		    ]
	   }
    ];
    return (
      <div className="mp-music-player">
      <CSSTransitionGroup transitionName="my-player" transitionAppear={true} transitionAppearTimeout={500} component="div">
        <Player key="1"
          songs={songs}/>
      </CSSTransitionGroup>		
      </div>
    );
  }
}