import React from 'react';
import { Row, Column } from '../../src';
import { Heading, Paragraph } from '../../src';
import { Button } from '../../src';

import styles from './ExamplePage.css';

function Section({ children }){
    return <Row vertical className={styles.section}>{children}</Row>
}

function GridCell({ children, style }){
    return <div className={styles.gridCell} style={style}>{children}</div>
}

function SectionHeading({ children }){
    return <Heading type='h4' className={styles.sectionHeading}>{children}</Heading>
}

export default class ExamplePage extends React.Component{
    render(){
        return (
            <div className={styles.container}>
                <Section>
                    <SectionHeading>Heading</SectionHeading>
                    <Row>
                        <Column flex='1'>
                            <Row vertical>
                                <Heading type='h1'>Heading H1</Heading>
                                <Heading type='h2'>Heading H2</Heading>
                                <Heading type='h3'>Heading H3</Heading>
                                <Heading type='h4'>Heading H4</Heading>
                            </Row>
                        </Column>
                        <Column flex='1'>
                            <Row vertical>
                                <Heading type='h1' muted>Heading H1</Heading>
                                <Heading type='h2' muted>Heading H2</Heading>
                                <Heading type='h3' muted>Heading H3</Heading>
                                <Heading type='h4' muted>Heading H4</Heading>
                            </Row>
                        </Column>
                    </Row>
                </Section>
                <Section>
                    <SectionHeading>Paragraph</SectionHeading>
                    <Row>
                        <Column flex='0 0 50%' variant='truncate-fix'>
                            <Row vertical>
                                <Paragraph variant='margin-bottom truncate no-wrap'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore</Paragraph>
                                <Paragraph muted>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore</Paragraph>
                            </Row>
                        </Column>
                    </Row>
                </Section>
                <Section>
                    <SectionHeading>Buttons</SectionHeading>
                    <Row variant='margin-bottom margin-between'>
                        <Button>Basic</Button>
                        <Button variant='primary'>Primary</Button>
                        <Button variant='dark'>Dark</Button>
                        <Button variant='white'>White</Button>
                        <Button variant='submit'>Submit</Button>
                        <Button variant='blank'>Blank</Button>
                        <Button variant='red'>Red</Button>
                    </Row>
                    <Row variant='margin-bottom margin-between'>
                        <Button variant='basic small'>Small</Button>
                        <Button variant='basic wide'>Wide</Button>
                        <Button variant='basic full-width'>Full Width</Button>
                    </Row>
                    <Row variant='margin-between'>
                        <Button variant='basic rounded'>Rounded</Button>
                        <Button variant='basic circular'>Circular</Button>
                        <Button variant='basic dashed'>Dashed</Button>
                    </Row>
                </Section>
                <Section>
                    <SectionHeading>Grid</SectionHeading>
                    <Row variant='vertical margin-bottom'>
                        <Row>
                            <GridCell />
                        </Row>
                        <Row>
                            <GridCell />
                            <GridCell />
                        </Row>
                        <Row>
                            <GridCell />
                            <GridCell />
                            <GridCell />
                        </Row>
                    </Row>
                    <Row vertical>
                        <Row variant='margin-bottom margin-between'>
                            <Column flex='1'>
                                <GridCell />
                            </Column>
                            <Column flex='1'>
                                <GridCell />
                            </Column>
                        </Row>
                        <Row variant='margin-between'>
                            <Column flex='1'>
                                <GridCell />
                            </Column>
                            <Column flex='0 0 80%'>
                                <GridCell />
                            </Column>
                            <Column flex='1'>
                                <GridCell />
                            </Column>
                        </Row>
                    </Row>
                </Section>
            </div>
        )
    }
}
