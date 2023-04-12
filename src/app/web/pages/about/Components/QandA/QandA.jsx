import React from 'react'

import Head2 from '../Head/Head2/Head2'
import classes from './QandA.module.css'
import QandACard from './QandACard/QandACard'


const QandA = () => {

    const txt = {
        title: 'Need help?',
        subtitle: 'Frequently Asked Questions'
    }

    const QandA1 = [
        {
            question: 'Quia consequuntur magni dolores eos qui ratione voluptatem sequi?',
            answer: 'At vero eos et accusamus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat quo voluptas nulla pariatur? Non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.'
        },
        {
            question: 'At vero eos et accusamus. Lorem ipsum dolor sit amet, consectetur elit?',
            answer: 'At vero eos et accusamus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat quo voluptas nulla pariatur? Non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.'
        },
        {
            question: 'Non numquam eius modi tempora incidunt ut et dolore aliquam?',
            answer: 'At vero eos et accusamus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat quo voluptas nulla pariatur? Non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.'
        },
    ]

      const QandA2 = [
        {
            question: 'Ut aut reiciendis voluptatibus maiores alias consequatur?',
            answer: 'At vero eos et accusamus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat quo voluptas nulla pariatur? Non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.'
        },
        {
            question: 'Enim ad minim veniam, quis nostrud exercitation ullamco?',
            answer: 'At vero eos et accusamus. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat quo voluptas nulla pariatur? Non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.'
        },
    ]
    return (
        <div className={classes.container}>
            <div className={classes.firstRow}>
                <div>
                    <Head2 txt={txt}/>
                </div>
                <div>
                     <p>Sed venenatis nibh nisl, id efficitur augue sodales sed. Nam nec efficitur turpis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur sed leo vel diam vehicula sagittis. Praesent ornare sapien a arcu imperdiet.</p>
                </div>
            </div>
            <div className={classes.secondRow}>
                {QandA1.map((q, i) => <QandACard key={i} question={q.question} answer={q.answer}/>)}
            </div>
            <div className={classes.thirdRow}>
                {QandA2.map((q, i) => <QandACard key={i} question={q.question} answer={q.answer}/>)}
            </div>
        </div>
    )
}

export default QandA
