import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Grid, Transition, Menu, Card } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function Home() {
    const { user } = useContext(AuthContext);
    const { loading, data: { getPosts: posts } = {} } = useQuery(FETCH_POSTS_QUERY);
        
    return (
        <Grid columns='equal'>
            <Grid.Row>
                <Grid.Column className='sidebar-spacing'>
                    <Menu vertical fluid>
                        <Menu.Item name='recents' style={{ marginLeft: '5px' }} />
                        <Menu.Item name='trends' style={{ marginLeft: '5px' }} />
                        <Menu.Item name='memories' style={{ marginLeft: '5px' }} />
                        <Menu.Item name='politics' style={{ marginLeft: '5px' }} />
                        <Menu.Item name='relationship' style={{ marginLeft: '5px' }} />
                    </Menu>
                </Grid.Column>
                <Grid.Column width={8}>
                    <Grid.Row>
                        {user && (
                            <Grid.Column>
                                <PostForm />
                            </Grid.Column>
                        )}
                    </Grid.Row>
                    <Grid.Row>
                        {
                            loading ? (<h1>Loading Posts</h1>) : (
                                <Transition.Group>
                                    {
                                        posts && posts.map(post => (
                                            <Grid.Column key={post.id}>
                                                <PostCard post = {post} />
                                            </Grid.Column>
                                        )) 
                                    }
                                </Transition.Group>
                            )
                        }
                    </Grid.Row>
                </Grid.Column>
                <Grid.Column className='match-spacing'>
                    <Card.Group>
                        <Card fluid color='teal' header='Find Your Daily Friend' style={{ textAlign: 'center' }} />
                    </Card.Group>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default Home;