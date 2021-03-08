import React, { useEffect, useState, useRef } from "react"

const loopVideo = async (
  media: string,
  videoRef: React.MutableRefObject<HTMLVideoElement | null>
) => {
  const mediaSource = new MediaSource()
  mediaSource.addEventListener("sourceopen", async function () {
    var sourceBuffer = mediaSource.addSourceBuffer("video/mp4")

    const res = await fetch(media)
    const buffer = await res.arrayBuffer()
    sourceBuffer.appendBuffer(buffer)
  })
  if (!videoRef.current) return
  videoRef.current.src = URL.createObjectURL(mediaSource)
}

function Text({ media }: { media: string }) {
  const [content, setContent] = useState<string | null>(null)

  useEffect(() => {
    fetch(media)
      .then((r) => r.text())
      .then((r) => setContent(r))
  }, [])

  return (
    <div className="nfte__media-content nfte__media-content--text pl1 pr1 pt1 pb1">
      {content}
    </div>
  )
}

function Video({ media, autoPlay }: { media: string; autoPlay: boolean }) {
  const videoRef = useRef(null)
  useEffect(() => {
    if (!videoRef) return
    loopVideo(media, videoRef)
  }, [])

  return (
    <video
      ref={videoRef}
      className="nfte__media-content"
      muted
      autoPlay={autoPlay}
      controls={!autoPlay}
      loop
      playsInline
    >
      {/* <source src={media} /> */}
    </video>
  )
}

function Audio({ media }: { media: string }) {
  return <audio className="nfte__media-content" controls src={media}></audio>
}

export default function Media({
  media,
  mediaMimeType,
  autoPlay,
}: {
  media: string
  mediaMimeType: string
  autoPlay: boolean
}) {
  if (mediaMimeType?.includes("text")) return <Text media={media} />

  if (mediaMimeType?.includes("video"))
    return <Video media={media} autoPlay={autoPlay} />

  if (mediaMimeType?.includes("audio")) return <Audio media={media} />

  return <img className="nfte__media-content" src={media} />
}
