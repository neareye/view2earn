import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import classnames from 'classnames';
import VideoJS from '../../Widgets/AdVideo';

import {
    setWatchVideo,
} from '../../../reducers/ThemeOptions';

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
    faAngleDown,
    faCartShopping
} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import nft1 from '../../../assets/images/nft-imgs/1.jpg';
import nft2 from '../../../assets/images/nft-imgs/2.jpg';
import nft3 from '../../../assets/images/nft-imgs/3.jpg';
import nft4 from '../../../assets/images/nft-imgs/4.jpg';
import nft5 from '../../../assets/images/nft-imgs/5.jpg';
import nft6 from '../../../assets/images/nft-imgs/6.jpg';

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

const nftData = [
    {
        'id': 27609,
        't': 'Make your next move with an impressive portfolio website. Start your free trial.',
        'l': '',
        'i': nft1,
        'v': 'https://filesamples.com/samples/video/mp4/sample_960x540.mp4',
        'price' : '0.3 Ⓝ'
    },
    {
        'id': 61650,
        't': 'Algorithmia makes deploying & hosting AI/ML models simple with the AI Layer.',
        'l': '',
        'i': nft2,
        'v': 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
        'price' : '1 Ⓝ'
    },
    {
        'id': 62661,
        't': 'The new generation of project management tools is here and it’s visual.',
        'l': '',
        'i': nft3,
        'v': 'https://download.samplelib.com/mp4/sample-5s.mp4',
        'price' : 'Free'
    },
    {
        'id': 32058,
        't': 'Job searching is awful. Vettery makes it better. Free, easy, and transparent!.',
        'l': '',
        'i': nft4,
        'v': 'https://download.samplelib.com/mp4/sample-20s.mp4',
        'price' : '1.5 Ⓝ'
    },
    {
        'id': 32059,
        't': 'Job searching is awful. Vettery makes it better. Free, easy, and transparent!.',
        'l': '',
        'i': nft5,
        'v': 'https://download.samplelib.com/mp4/sample-20s.mp4',
        'price' : '1.5 Ⓝ'
    },
    {
        'id': 32078,
        't': 'Job searching is awful. Vettery makes it better. Free, easy, and transparent!.',
        'l': '',
        'i': nft6,
        'v': 'https://download.samplelib.com/mp4/sample-20s.mp4',
        'price' : '1.5 Ⓝ'
    },
];

class Profile extends Component {
    constructor() {
        super();

        this.state = {
            dropdownOpen: false,
            activeTab1: '11',
            viewTotal: 300000,

        };
        this.toggle = this.toggle.bind(this);
        this.toggle1 = this.toggle1.bind(this);
        this.getAdElem = this.getAdElem.bind(this);
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
        let {watchVideo, xemWatchVideo} = this.props;
        console.log('watch video now: ', videoId);
        xemWatchVideo(videoId);
    }

    getAdElem(id) {
        for (let elem of nftData) {
            if (elem['id'] == id) {
                return elem;
            }
        }

        return null;
    }

    render() {
        let videoJsOptions = {
            autoplay: true,
            controls: false,
            responsive: true,
            fluid: true,
            sources: [{
                src: 'https://filesamples.com/samples/video/mp4/sample_960x540.mp4',
                type: 'video/mp4'
            }]
        };

        let {
            watchVideo,
        } = this.props;

        const videoElem = this.getAdElem(watchVideo);
        console.log('videoElem = ', videoElem);

        if (videoElem) {
            console.log('show video ', videoElem);
            videoJsOptions = {
                autoplay: true,
                controls: false,
                responsive: true,
                fluid: true,
                sources: [{
                    src: videoElem['v'],
                    type: 'video/mp4'
                }]
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
                            <PageTitle
                                heading="Profile"
                                subheading="Brands pay to show you what you’re interested in.
                                By completing your preferences you will see ads that are based on what you like and you’ll earn quicker because of it."
                                icon="pe-7s-car icon-gradient bg-mean-fruit"
                            />

                            <div className="categories__inner">
                                <h2 className="categories__heading">
                                    Preferences
                                </h2>

                            <Row>
                                <Col md="4">
                                    <div className="card mb-3 widget-chart card-border">
                                        <div className="text-center">
                                            <h3>Lifestyle</h3>
                                        </div>

                                        <img className="" src={'/images/fashion-d34a6fdcbdbdcb934be14dc8c573aee4.jpeg'} /> 
                                        
                                        <div className="mt-2">
                                            <button class="mb-2 me-2 btn btn-light">Mens Fashion<span class="badge bg-success badge-dot badge-dot-lg"> </span></button>
                                            <button class="mb-2 me-2 btn btn-light">Female Fashion<span class="badge bg-danger badge-dot badge-dot-lg"> </span></button>
                                            <button class="mb-2 me-2 btn btn-light">Trends<span class="badge bg-success badge-dot badge-dot-lg"> </span></button>
                                            <button class="mb-2 me-2 btn btn-light">Skin Care<span class="badge bg-danger badge-dot badge-dot-lg"> </span></button>
                                            <button class="mb-2 me-2 btn btn-light">Grooming<span class="badge bg-success badge-dot badge-dot-lg"> </span></button>
                                            <button class="mb-2 me-2 btn btn-light">Discounts / Sales<span class="badge bg-danger badge-dot badge-dot-lg"> </span></button>
                                            <button class="mb-2 me-2 btn btn-light">Luxury goods<span class="badge bg-success badge-dot badge-dot-lg"> </span></button>
                                            <button class="mb-2 me-2 btn btn-light">Accessories<span class="badge bg-danger badge-dot badge-dot-lg"> </span></button>
                                        </div>

                                        <img className="icon-ad" src={'/images/food-drink-1db0d10d819e0223ff61f6f415866b9c.jpeg'} /> 
                                        
                                        <div className="mt-2">
                                            <button class="mb-2 me-2 btn btn-light">Organic<span class="badge bg-danger badge-dot badge-dot-lg"> </span></button>
                                            <button class="mb-2 me-2 btn btn-light">Vegetarian<span class="badge bg-success badge-dot badge-dot-lg"> </span></button>
                                            <button class="mb-2 me-2 btn btn-light">Vegan<span class="badge bg-success badge-dot badge-dot-lg"> </span></button>
                                            <button class="mb-2 me-2 btn btn-light">Coffee<span class="badge bg-success badge-dot badge-dot-lg"> </span></button>
                                            <button class="mb-2 me-2 btn btn-light">Cooking<span class="badge bg-danger badge-dot badge-dot-lg"> </span></button>
                                            <button class="mb-2 me-2 btn btn-light">Eating Out<span class="badge bg-success badge-dot badge-dot-lg"> </span></button>
                                            <button class="mb-2 me-2 btn btn-light">Beer / Wine<span class="badge bg-success badge-dot badge-dot-lg"> </span></button>
                                        </div>
                                    </div>
                                </Col>

                                <Col md="4">
                                    <div className="card mb-3 widget-chart card-border">
                                        <div className="text-center">
                                            <h3>Digital</h3>
                                        </div>
                                        <img className="icon-ad" src={'/images/technology-fe207b9e8e1b10228709b4f2709e16db.jpeg'} />
                                        <div className="mt-2">
                                            <button class="mb-2 me-2 btn btn-light">Android<span class="badge bg-danger badge-dot badge-dot-lg"> </span></button>
                                            <button class="mb-2 me-2 btn btn-light">iOS<span class="badge bg-success badge-dot badge-dot-lg"> </span></button>
                                            <button class="mb-2 me-2 btn btn-light">Virtual Reality<span class="badge bg-danger badge-dot badge-dot-lg"> </span></button>
                                            <button class="mb-2 me-2 btn btn-light">Wearable Tech<span class="badge bg-success badge-dot badge-dot-lg"> </span></button>
                                        </div>

                                        <img className="icon-ad" src={'/images/gaming-a1484f95115aa2134a3e037dfa1f7a71.jpeg'} />
                                        <div className="mt-2">
                                            <button class="mb-2 me-2 btn btn-light">Computer Gaming<span class="badge bg-success badge-dot badge-dot-lg"> </span></button>
                                            <button class="mb-2 me-2 btn btn-light">Mobile Gaming<span class="badge bg-danger badge-dot badge-dot-lg"> </span></button>
                                            <button class="mb-2 me-2 btn btn-light">Video Games<span class="badge bg-success badge-dot badge-dot-lg"> </span></button>
                                            <button class="mb-2 me-2 btn btn-light">Blockchain Games<span class="badge bg-danger badge-dot badge-dot-lg"> </span></button>
                                        </div>
                                    </div>
                                </Col>

                                <Col md="4">
                                    <div className="card mb-3 widget-chart card-border">
                                        <div className="text-center">
                                            <h3>Explore</h3>
                                        </div>
                                        <img className="icon-ad" src={'/images/travel-be6e8f4b0cef655498132127df11ec94.jpeg'} />
                                        <div className="mt-2">
                                            <button class="mb-2 me-2 btn btn-light">Adventure Holidays<span class="badge bg-danger badge-dot badge-dot-lg"> </span></button>
                                            <button class="mb-2 me-2 btn btn-light">Backpacking<span class="badge bg-success badge-dot badge-dot-lg"> </span></button>
                                            <button class="mb-2 me-2 btn btn-light">Luxury Holidays<span class="badge bg-danger badge-dot badge-dot-lg"> </span></button>
                                            <button class="mb-2 me-2 btn btn-light">Worldwide<span class="badge bg-success badge-dot badge-dot-lg"> </span></button>
                                        </div>

                                        <img className="icon-ad" src={'/images/healthy-living-5e9881ed7d06f2291fc7a28d0020e25a.jpeg'} />
                                        <div className="mt-2">
                                            <button class="mb-2 me-2 btn btn-light">Android<span class="badge bg-danger badge-dot badge-dot-lg"> </span></button>
                                            <button class="mb-2 me-2 btn btn-light">iOS<span class="badge bg-success badge-dot badge-dot-lg"> </span></button>
                                            <button class="mb-2 me-2 btn btn-light">Virtual Reality<span class="badge bg-danger badge-dot badge-dot-lg"> </span></button>
                                            <button class="mb-2 me-2 btn btn-light">Wearable Tech<span class="badge bg-success badge-dot badge-dot-lg"> </span></button>
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                            </div>
                        </div>
                    </CSSTransition>
                </TransitionGroup>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    watchVideo: state.ThemeOptions.watchVideo,
});

const mapDispatchToProps = dispatch => ({
    xemWatchVideo: videoId => dispatch(setWatchVideo(videoId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
