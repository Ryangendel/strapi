import React from "react";
import { Link } from "react-router-dom"
// import useFetch from "../hooks/useFetch"
import { useMutation, useQuery, gql } from '@apollo/client'
import RecipeReviewCard from '../components/FoodCard'
import Grid from "@mui/material/Grid"
import Item from "@mui/material/Grid"
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { useTheme } from '../hooks/userContext';

const REVIEWS = gql`
query restaurn{
    restaurants{
      name
      picture{
          formats
      }
    }
  }
`

export default function Homepage(userData) {
    const { currentUser, setCurrentClient } = useTheme();
    const { loading, error, data } = useQuery(REVIEWS)
   
    console.log(currentUser)

    
 
    function likeFunction(e) {
        alert("hello")
    }

    if (loading) return <p>...loading</p>
    if (error) return <p>...error</p>
    return (
        <div>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh', marginTop:"5vh" }}
                
                >
                <Grid item xs={3}>
                    <Card>
                        <RecipeReviewCard foodImage={`http://localhost:1337${data.restaurants[0].picture[0].formats.medium.url}`} />
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}