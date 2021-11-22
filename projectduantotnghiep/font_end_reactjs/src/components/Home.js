import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import '../css/home.css'
import { useSelector, useDispatch } from 'react-redux';
import { getListPostByCategory } from '../redux/features/home/postsByCategorySlice';
import { getListPostNew } from '../redux/features/home/postsNewSlice';
import { NewsHeaderCard } from 'react-ui-cards';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';
import { FiCodesandbox } from "react-icons/fi";
import moment from 'moment';
function Home() {
    let history = useHistory();
    const dispatch = useDispatch();
    const loadingpostnew = useSelector((state) => state.postnew.isLoading);
    const loadingpostcategory = useSelector((state) => state.postbycategory.isLoading);
    const listpostnew = useSelector((state) => state.postnew.data);
    const listbycategory = useSelector((state) => state.postbycategory.data);


    useEffect(() => {
        dispatch(getListPostByCategory());
        dispatch(getListPostNew());
        // console.log(listbycategory[0].listpost)

    }, []);

    const fadeImages = [
        {
            url: 'https://mobibeat.mobifone.vn/ttnb/upload/news_images/thumb_1a30fdb0a8e0a57848aecf5a625a2197.png',
            tittle: 'Hội nghị Trung ương: Tăng cường xây dựng, chỉnh đốn Đảng',
            content: 'Sáng 11/11, Cục QLĐB III.3 (Tổng cục Đường bộ VN) cho biết, do ảnh hưởng mưa lớn kéo dài, vào khoảng 10h00 sáng nay (11/11) tại Km41+300(P) QL 27C đoạn qua xã Sơn Thái, (huyện Khánh Vĩnh, tỉnh Khánh Hoà) xảy ra sạt lở taluy dương xuống mặt đường gây tắc đường hoàn toàn. Khối lượng đất, đá ước khoảng 9.000 m3.'
        },
        {
            url: 'https://mobibeat.mobifone.vn/ttnb/upload/news_images/thumb_74aa20ed2fbebcacf9fdd3b657fe6fff.jpg',
            tittle: 'Hội nghị cấp cao: chính trị pháp luạt',
            content: 'Sáng 11/11, Cục QLĐB III.3 (Tổng cục Đường bộ VN) cho biết, do ảnh hưởng mưa lớn kéo dài, vào khoảng 10h00 sáng nay (11/11) tại Km41+300(P) QL 27C đoạn qua xã Sơn Thái, (huyện Khánh Vĩnh, tỉnh Khánh Hoà) xảy ra sạt lở taluy dương xuống mặt đường gây tắc đường hoàn toàn. Khối lượng đất, đá ước khoảng 9.000 m3.'
        },
        {
            url: 'https://mobibeat.mobifone.vn/ttnb/upload/news_images/thumb_494864240ef388d42aaeb0491c52d82d.jpg',
            tittle: 'Slide 3',
            content: 'Sáng 11/11, Cục QLĐB III.3 (Tổng cục Đường bộ VN) cho biết, do ảnh hưởng mưa lớn kéo dài, vào khoảng 10h00 sáng nay (11/11) tại Km41+300(P) QL 27C đoạn qua xã Sơn Thái, (huyện Khánh Vĩnh, tỉnh Khánh Hoà) xảy ra sạt lở taluy dương xuống mặt đường gây tắc đường hoàn toàn. Khối lượng đất, đá ước khoảng 9.000 m3.'
        },
    ];
    const properties = {
        duration: 5000,
        transitionDuration: 1000,
        infinite: true,
        prevArrow: <img className="prev-icon icon" src="../access/preview.png"></img>,
        nextArrow: <img className="next-icon icon" src="../access/next.png"></img>
    };

    return (
        <div>
            <div>
                <div className="slide-container">
                    <Fade {...properties}>
                        {fadeImages.map((fadeImage) => (
                            <div key={fadeImage}>
                                <div className="slide">
                                    <div className="content">
                                        <span className='tittle-post-new'>{fadeImage.tittle}</span>
                                        <span className='content-post-new'>{fadeImage.content}</span>
                                    </div>
                                    <img className="slide-img" src={fadeImage.url}>
                                    </img>
                                </div>
                            </div>
                        ))}
                    </Fade>
                </div>
                <div className="body-container">
                    {loadingpostnew ? <Skeleton height={90} count={1} >
                    </Skeleton> :
                        <div class="post-list">
                            {listpostnew.map(post => (
                                <div className="body-item" onClick={() => history.push(`/${post._id}`)}>
                                    <img className="post-image" src={post.imagepost} />
                                    <h2 className="post-title" >{post.title.slice(0, 150) }</h2>
                                    <p className="post-desc">{post.description.slice(0, 250) + "..."}</p>
                                    <p className="post-like-count" >Lượt thích: {post.likecount}</p>
                                </div>
                            ))}
                        </div>
                    }
                    <div className="adv" >
                        <h2 className="post-category-new">Bài viết được ghim</h2>
                        <NewsHeaderCard
                            thumbnail='https://mobibeat.mobifone.vn/ttnb/upload/news_images/thumb_4597e496ad28c0a3e4ee7cc8295918e4.jpg'
                            title='Polish mountaineers on the top'
                            author={`người viết: đạt`}
                            date='Feb 2, 2018'
                            tags={[() => (<i>lượt thích : 10</i>)]}
                        />
                    </div>

                </div>

                <div className="body-container2">
                    {loadingpostcategory ? <Skeleton height={90} count={4}/> :
                        <div className="listpost">
                            {listbycategory.map(category => (
                                <div>
                                    <h2 className="post-category" > <FiCodesandbox className="icon-category" /> {category.namecategory}</h2>
                                    <div className="post-list-category" >
                                        {category.listpost.map(postcategory => (
                                            <div className="post-list-category-item">
                                                <img className="post-img-category" src={postcategory.imagepost}></img>
                                                <div className="infor-post">
                                                    <h2 className="post-title-category" >{postcategory.title}</h2>
                                                    <p className="post-day-category" >{moment(postcategory.createAt).format('DD/MM/YYYY')}</p>
                                                    {/* <p className="post-day-category" >{postcategory.createAt.getUTCMonth() + 1}</p> */}
                                                </div>
                                            </div>
                                        ))}
                        
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                    <div className="adv" >
                        <h2 className="post-category-new">Nổi bật</h2>
                        <NewsHeaderCard
                            thumbnail='https://mobibeat.mobifone.vn/ttnb/upload/news_images/thumb_4597e496ad28c0a3e4ee7cc8295918e4.jpg'
                            title='Polish mountaineers on the top'
                            author={`người viết: đạt`}
                            date='Feb 2, 2018'
                            tags={[() => (<i>lượt thích : 10</i>)]}
                        />
                    </div>
                </div>

                <div className="poster">

                </div>




            </div>
        </div>
    );
}

export default Home;