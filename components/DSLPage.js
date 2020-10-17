import { Figure, Accordion, Card, Button } from 'react-bootstrap'
import DSL from './dsl.png'
import React, { Component } from 'react'
import './styles.css'

class DSLPage extends Component {
    note = 'Note: You can change an existing sound you have added simply by calling Add, with the same name of the sound you added. It also might be helpful to copy the entire command that you put in before, and keep adding on to it'
    samples = [
        {
            eventKey: '1',
            title: 'Sample Music 1',
            text: [
                'Add sound_buildup as buildup1 at 0, length 11.42;',
                'Add sound_snarebuild as buildup2 at 0;',
                'Add sound_drop as drop at 12, volume 299;',
                'Add sound_atmosphereHigh as drop1 at 11.3, length 0.7;',
                'Add sound_atmosphere as drop2 at 13.7;',
                'Add sound_trumprich as voiceover at 10.4, volume 250;',
                'Add sound_lofidrum as beat1 at 11.3, speed 1.2, length 10;',
                'Add sound_trumpmilliondollar as dollars at 14.8, speed 0.8, volume 100;',
                'Add sound_wobble as wobble at 18, length 20;',
                'Add sound_trumpamerica as murica at 22, speed 0.9;',
                'Add sound_trumprich as rich at 23, speed 0.75, volume 200;',
                'Add sound_organ as organ at 31.6, volume 30;',
                'Add sound_organ as organ2 at 46;',
                'Add sound_lofidrum as beat2 at 46, speed 0.9, volume 60, length 14;',
            ],
        },
        {
            eventKey: '2',
            title: 'Sample Music 2',
            text: [
                'Add sound_synthchorus as synthochorus1 at 0, volume 50; Add sound_midChorus as midchorus at 24, length 36, volume 70;',
                'Add sound_synthchorus as synthchorus2 at 24, length 36 (interval 12), volume 50;',
                'Add sound_buildup as buildup at 36;',
                'Add sound_highChorus as highchorus at 48, volume 70;',
                'Add sound_lofidrum as lofidrum at 48, speed 1.05, length 12 (interval 6);',
                'Add sound_kick as kick at 24, speed 2, volume 60, length 20 (interval 1.5);',
                'Add sound_hat as hat at 36, length 12 (interval 1.5);',
                'Add sound_hat as hatFast1 at 47.5, length 0.5 (interval 0.1);',
                'Add sound_hat as hatFast2 at 58, length 0.5 (interval 0.1);',
                'Add sound_snare as snare at 48.75, length 12 (interval 1.5);'
            ],
        }
    ]

    render() {
        return (
            <div>
                <div className="inputform">
                    <Figure class="figurepic">
                        <Figure.Image src={DSL} />
                        <Figure.Caption>SoundApp DSL</Figure.Caption>
                    </Figure>
                </div>
                <Accordion className="accord">
                    {this.samples.map(x => (
                        <Card className="accordcards">
                            <Accordion.Toggle as={Card.Header} eventKey={x.eventKey}>
                                {x.title}
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={x.eventKey}>
                                <Card.Body className="accordtext">
                                    <div>
                                        {x.text.map(t => (
                                            <h6>{t}</h6>
                                        ))}
                                    </div>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    ))}
                </Accordion>
                <h4 className="text-muted"><small>{this.note}</small></h4>
            </div>
        )
    }
}
export default DSLPage
