const spawn = require('child_process').spawn;

const keyRTMP = "rtmp://ingest.mediaserver.express/live/qcewKnba?pwd=efaaaa"

const urlSrc = "https://epiconvh.s.llnwi.net/showbox/master_1024.m3u8"

let ffmpeg = spawn('ffmpeg', ['-re', '-stream_loop', '-1', '-i', `${ urlSrc }`, '-c:v', 'libx264', '-preset', 'veryfast',
	'-framerate', '60', '-maxrate', '3000k', '-bufsize', '6000k', '-pix_fmt', 'yuv420p', '-g', '50', '-c:a', 'aac', '-b:a', '128k',
	'-ac', '2', '-ar', '44100', '-f', 'flv', `${ keyRTMP }`
]);
ffmpeg.on('exit', (statusCode) => {
	if (statusCode === 0) {
		console.log('Stream Completed')
	}
})

ffmpeg
	.stderr
	.on('data', (task) => {
		console.log('Task:', new String(task))
	})
