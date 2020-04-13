import React, { ReactElement } from 'react'

import {
  portfolio,
  portfolioItem,
  portfolioImageWrapper,
  portfolioImage,
} from './portfolio.module.css'

import Space from '../../assets/images/space.webp'
import Particlez from '../../assets/images/particlez.webp'
import Guardian from '../../assets/images/guardian.webp'
import Tensorflow from '../../assets/images/tensorflow.webp'
import Juice from '../../assets/images/juice.webp'
import Keyboard from '../../assets/images/keyboard.webp'

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
      <div className={portfolio}>
        {projects.map((project) => (
          <div className={portfolioItem} key={project.id}>
            <figure className={portfolioImageWrapper}>
              <a href={project.link}>
                <img
                  src={project.image}
                  alt={project.title}
                  className={portfolioImage}
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
