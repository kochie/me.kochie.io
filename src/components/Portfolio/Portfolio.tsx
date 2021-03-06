import React, { ReactElement } from 'react'
import Image from 'next/image'

import style from './portfolio.module.css'

const Space = '/images/space.webp'
const Particlez = '/images/particlez.webp'
const Guardian = '/images/guardian.webp'
const Tensorflow = '/images/tensorflow.webp'
const Juice = '/images/juice.webp'
const Keyboard = '/images/keyboard.webp'

const projects = [
  {
    image: Space,
    title: 'Space',
    description: 'A small webapp that follows the mouse.',
    link: 'https://kochie.space',
    id: '1',
  },
  {
    image: Particlez,
    title: 'Particlez',
    description: 'A real time n-body particle simulator for the web.',
    link: 'https://3body.now.sh',
    id: '2',
  },
  {
    image: Guardian,
    title: 'Guardian',
    description:
      'An experiment in transferring cyptographic keys between devices without the user needing to copy keys themselves.',
    link: 'https://github.com/kochie/guardian-server',
    id: '3',
  },
  {
    image: Tensorflow,
    title: 'Optimising Neural Networks for Embedded Systems',
    description:
      'My final year project - focusing on modifying the activation layers of convolutional neural networks to work better on embedded devices.',
    link: 'https://bitbucket.org/kochie/fyp',
    id: '4',
  },
  {
    image: Juice,
    title: 'Juice',
    description: 'A Json-Web-Token analyser.',
    link: 'https://github.com/kochie/juice',
    id: '5',
  },
  {
    image: Keyboard,
    title: 'McGurrin',
    description: 'A tool to help with learning to touch type.',
    link: 'https://github.com/kochie/mcgurrin',
    id: '6',
  },
]

export default function Portfolio(): ReactElement {
  return (
    <div>
      <h2>Recent Work</h2>
      <div className={style.portfolio}>
        {projects.map((project) => (
          <div className={style['portfolio-item']} key={project.id}>
            <figure className={style['portfolio-image-wrapper']}>
              <a href={project.link}>
                <Image
                  layout='fill'
                  src={project.image}
                  alt={project.title}
                  className={style['portfolio-image']}
                />
                {/* <span className="portfolio-text">View</span> */}
              </a>
            </figure>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
