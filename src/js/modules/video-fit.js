const videoFit = () => {
    const $videos = $(`[data-video-fit]`);
    let $video, $videoFrame, w, h, ratio, fW, fH, fRatio;

    const resizeVideos = () => {
        $videos.each((index, target) => {
            $video = $(target);
            $videoFrame = $video.find(`iframe`);
            w = $video.outerWidth();
            h = $video.outerHeight();
            ratio = w/h;
            fW = $videoFrame.attr("width");
            fH = $videoFrame.attr("height");
            fRatio = fW/fH;

            if (w == 0) return;

            if (fRatio > ratio) {
                $videoFrame.css({
                    width: h * fRatio,
                    height: h,
                    transform: `translateX(${ - (h * fRatio - w) / 2 }px)`,
                });
            } else {
                $videoFrame.css({
                    width: w,
                    height: w / fRatio,
                    transform: `translateY(${ - (w / fRatio - h) / 2 }px)`,
                })
            }
        });
    }

    resizeVideos();
    $(window).on("resize", resizeVideos);
}

$(videoFit);

export default videoFit;
