import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import classnames from 'classnames';
import VideoJS from '../../Widgets/AdVideo';

import {
    setWatchVideo,
} from '../../../reducers/ThemeOptions';

import {
    setEyeTokenBalance,
} from '../../../reducers/WalletOptions';

import {
    Row, Col,
    Button,
    CardHeader,
    Card,
    CardBody,
    Progress,
    TabContent,
    TabPane,
} from 'reactstrap';

import PageTitle from '../../../Layout/AppMain/PageTitle';

import {
    AreaChart, Area, Line,
    ResponsiveContainer,
    Bar,
    BarChart,
    ComposedChart,
    CartesianGrid,
    Tooltip,
    LineChart
} from 'recharts';

import {
    faAngleUp,
    faArrowRight,
    faArrowUp,
    faArrowLeft,
    faAngleDown
} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import avatar1 from '../../../assets/utils/images/avatars/1.jpg';
import avatar2 from '../../../assets/utils/images/avatars/2.jpg';
import avatar3 from '../../../assets/utils/images/avatars/3.jpg';
import avatar4 from '../../../assets/utils/images/avatars/4.jpg';


const data = [
    {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
    {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
    {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
    {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
    {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
    {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
    {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
    {name: 'Page C', uv: 2000, pv: 6800, amt: 2290},
    {name: 'Page D', uv: 4780, pv: 7908, amt: 2000},
    {name: 'Page E', uv: 2890, pv: 9800, amt: 2181},
    {name: 'Page F', uv: 1390, pv: 3800, amt: 1500},
    {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];

const data2 = [
    {name: 'Page A', uv: 5400, pv: 5240, amt: 1240},
    {name: 'Page B', uv: 7300, pv: 4139, amt: 3221},
    {name: 'Page C', uv: 8200, pv: 7980, amt: 5229},
    {name: 'Page D', uv: 6278, pv: 4390, amt: 3200},
    {name: 'Page E', uv: 3189, pv: 7480, amt: 6218},
    {name: 'Page D', uv: 9478, pv: 6790, amt: 2200},
    {name: 'Page E', uv: 1289, pv: 1980, amt: 7218},
    {name: 'Page F', uv: 3139, pv: 2380, amt: 5150},
    {name: 'Page G', uv: 5349, pv: 3430, amt: 3210},
];

const videoData = [
    {
        'id': 27609,
        't': 'Make your next move with an impressive portfolio website. Start your free trial.',
        'l': '',
        'i': 'https://view2earn.s3.us-east-1.amazonaws.com/27609.jpeg',
        'v': 'https://filesamples.com/samples/video/mp4/sample_960x540.mp4',
        'p': 5
    },
    {
        'id': 61650,
        't': 'Algorithmia makes deploying & hosting AI/ML models simple with the AI Layer.',
        'l': '',
        'i': 'https://view2earn.s3.us-east-1.amazonaws.com/61650.png',
        'v': 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
        'p': 6
    },
    {
        'id': 62661,
        't': 'The new generation of project management tools is here and it’s visual.',
        'l': '',
        'i': 'https://view2earn.s3.us-east-1.amazonaws.com/62661.png',
        'v': 'https://download.samplelib.com/mp4/sample-5s.mp4',
        'p': 7
    },
    {
        'id': 32058,
        't': 'Job searching is awful. Vettery makes it better. Free, easy, and transparent!.',
        'l': '',
        'i': 'https://view2earn.s3.us-east-1.amazonaws.com/32058.jpeg',
        'v': 'https://download.samplelib.com/mp4/sample-20s.mp4',
        'p': 8
    },
];

class VideosDashboard extends Component {
    constructor() {
        super();

        this.state = {
            dropdownOpen: false,
            activeTab1: '11',
            viewTotal: 300000,
            lastVideoView: '',
        };
        this.toggle = this.toggle.bind(this);
        this.toggle1 = this.toggle1.bind(this);
        this.getAdElem = this.getAdElem.bind(this);
        this.videoOnReady = this.videoOnReady.bind(this);
        this.onPlay = this.onPlay.bind(this);
        this.onEnded = this.onEnded.bind(this);
        this.onPaused = this.onPaused.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    toggle1(tab) {
        if (this.state.activeTab1 !== tab) {
            this.setState({
                activeTab1: tab
            });
        }
    }

    watchVideo(videoId) {
        let {watchVideo, setWatchVideo} = this.props;
        console.log('watch video now: ', videoId);
        setWatchVideo(videoId);
    }

    getAdElem(id) {
        for (let elem of videoData) {
            if (elem['id'] == id) {
                return elem;
            }
        }

        return null;
    }

    videoOnReady(player) {
        console.log('videoOnReady ---', player);
    }

    onPlay(options) {
        
    }

    onEnded(options) {
        console.log('onEnded ---', options);

        console.log('onPlay ---', options);
        this.props.setEyeTokenBalance(options.point);

        setTimeout(() => {
            const userData = JSON.parse(localStorage.getItem('nyinf'));
            if (userData) {
                userData.eyeTokenBalance = this.props.eyeTokenBalance;
                window.localStorage.setItem('nyinf', JSON.stringify(userData));  
            } 
        }, 1000);
    }

    onPaused(options) {
        console.log('onPaused ---', options);
    }

    render() {
        let videoJsOptions = {
            autoplay: false,
            controls: true,
            responsive: true,
            fluid: true,
            sources: [{
                src: 'https://filesamples.com/samples/video/mp4/sample_960x540.mp4',
                type: 'video/mp4'
            }],
            point: 0,
        };

        let {
            watchVideo,
        } = this.props;

        const videoElem = this.getAdElem(watchVideo);
        console.log('videoElem = ', videoElem);

        if (videoElem) {
            console.log('show video ', videoElem);
            videoJsOptions = {
                autoplay: false,
                controls: true,
                responsive: true,
                fluid: true,
                sources: [{
                    src: videoElem['v'],
                    type: 'video/mp4'
                }],
                point: videoElem['p'],
            };
        }

        return (
            <Fragment>
                <TransitionGroup>
                    <CSSTransition
                        component="div"
                        className="TabsAnimation"
                        appear={true}
                        timeout={0}
                        enter={false}
                        exit={false}>
                        <div>
                            <div className="row">
                                {videoData.map((value, index) => {
                                    return (
                                    <div key={value.id} className="col-md-6 col-lg-3">
                                        <div className="card-shadow-danger mb-3 widget-chart widget-chart2 text-start card">
                                            <div className="widget-content">
                                                <div className="widget-content-outer">
                                                    <div className="widget-content-wrapper">
                                                        <div onClick={() => this.watchVideo(value.id)} className="carbon-example flex-wrapper row">
                                                            <div className="col-md-6 col-lg-6">
                                                                <img className="icon-ad" 
                                                                    src={value.i}
                                                                    />
                                                            </div>
                                                            <div className="col-md-6 col-lg-6">
                                                                <p className="text-muted opacity-6">{value.t}</p>
                                                                <p className="fine-print">ads via NearEye</p>
                                                            </div>
                                                        </div>   
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    )
                                })}
                            </div>

                            <Row>
                                <Col md="12" lg="8">
                                    <Card className="mb-3">
                                        <CardHeader className="card-header-tab">
                                            <div className="card-header-title">
                                                <i className="header-icon lnr-rocket icon-gradient bg-tempting-azure"> </i>
                                                Watch Ad Video To Earn
                                            </div>
                                        </CardHeader>
                                        <TabContent activeTab={this.state.activeTab1}>
                                            <TabPane tabId="11">
                                                <CardBody className="pt-2">
                                                    <Row className="mt-3">
                                                        <Col md="12">
                                                            <div className="widget-content">
                                                                <VideoJS 
                                                                    onReady={this.videoOnReady}
                                                                    onPlay={this.onPlay}
                                                                    onEnded={this.onEnded} 
                                                                    onPaused={this.onPaused} 
                                                                    options={videoJsOptions} 
                                                                />
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <div className="divider mt-4"/>
                                                </CardBody>
                                            </TabPane>
                                        </TabContent>
                                    </Card>
                                </Col>
                                <Col md="12" lg="4">
                                    <div className="card mb-3 widget-chart">
                                        <div className="widget-subheading mb-2">
                                            Your Gear(s)
                                        </div>
                                        <div className="widget-chart-content">
                                            <img width="100%"
                                                src={"https://view2earn-landingpage.vercel.app/assets/img/portfolio/fullsize/1.jpg"}
                                            />
                                        </div>
                                    </div>

                                    <div className="card mb-3 widget-chart">
                                        <div className="widget-chart-content">
                                            <div className="icon-wrapper rounded-circle">
                                                <div className="icon-wrapper-bg bg-warning"/>
                                                <i className="lnr-heart icon-gradient bg-premium-dark"> </i>
                                            </div>
                                            <div className="widget-numbers" id="nb_view">
                                                {this.state.viewTotal}
                                            </div>
                                            <div className="widget-subheading">
                                                Views
                                            </div>
                                        </div>
                                        <div className="widget-chart-wrapper chart-wrapper-relative">
                                            <ResponsiveContainer height={100}>
                                                <LineChart data={data2}
                                                        margin={{top: 0, right: 5, left: 5, bottom: 0}}>
                                                    <Line type="monotone" dataKey="pv" stroke="#d6b5ff" strokeWidth={2}/>
                                                    <Line type="monotone" dataKey="uv" stroke="#a75fff" strokeWidth={2}/>
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>

                                </Col>
                            </Row>
                            
                        </div>
                    </CSSTransition>
                </TransitionGroup>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    watchVideo: state.ThemeOptions.watchVideo,
    eyeTokenBalance: state.WalletOptions.eyeTokenBalance,
});

const mapDispatchToProps = dispatch => ({
    setWatchVideo: videoId => dispatch(setWatchVideo(videoId)),
    setEyeTokenBalance: videoId => dispatch(setEyeTokenBalance(videoId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideosDashboard);
