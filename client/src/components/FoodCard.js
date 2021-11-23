import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import { useTheme } from '../hooks/userContext';
import { useQuery, gql } from '@apollo/client'
import { GETLIKES } from "../hooks/queries"
import { setContext } from "apollo-link-context"

const REVIEWS1 = gql`
query restaurn{
    restaurants{
      name
      picture{
          formats
      }
    }
  }
`

const GETLIKES1 = gql`
  query {
    client (id: 1) {
        restaurantIDlikes
    }
  }
`;

const ADDLIKE = gql`
    query restaurn{
        restaurants{
            name
            picture{
                formats
            }
        }
    }
`


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function RecipeReviewCard(props) {
    const { currentUser, setCurrentClient } = useTheme();
    const [expanded, setExpanded] = React.useState(false);
    const [currentUserData, setCurrentUserData] = React.useState();
    const { loading, error, data } = useQuery(GETLIKES, {
        variables:{
            id: 1
        }
    })
    const profiles = data?.profiles || [];  

    React.useEffect(()=>{
        console.log("%%%%%%")
        console.log(currentUser.userprofile.id)
        console.log(currentUser.token)
        console.log("%%%%%%")
        setCurrentUserData(data)
    },[]);

    const handleExpandClick = () => {
        console.log()
        setExpanded(!expanded);
    };

    const notInterested = () => {
         
    }

    const interested = () => {
        console.log("&&&&&8888888")
        console.log(data)
        console.log("&&&&&8888888")
        setCurrentUserData(data)
        console.log("CURRENTUSERDATA")
        console.log(currentUser)
        console.log("CURRENTUSERDATA")
        console.log(currentUser.token)
        //const { loading, error, data } = useQuery(REVIEWS)
        // axios.put("http://localhost:1337/clients/1",
        //     {
        //         "restaurantIDlikes": "9999"
        //     },
        //     {
        //         headers: {
        //             "Content-Type": "application/json",
        //             "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjM3MzcxNzc4LCJleHAiOjE2Mzk5NjM3Nzh9.Lija2KSZeB5ePvkNSN-SB_W3SN38xJqmu_r3AJopR7M`
        //         }
        //     },

        // )
        //     .then(result => console.log(result))
        //     .catch(error => console.log('error', error));
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
          </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            />
            <CardMedia
                component="img"
                height="194"
                image={props.foodImage}
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
        </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton onClick={interested} aria-label="add to favorites">
                    <FavoriteIcon style={{ color: "green", transform: "scale(2.8)", marginLeft: "100%", marginBottom: "20px" }} />
                </IconButton>
                <IconButton aria-label="share">
                </IconButton>
                <NotInterestedIcon onClick={notInterested} style={{ color: "red", transform: "scale(2.8)", marginLeft: "60%", marginBottom: "20px" }} />
            </CardActions>
        </Card>
    );
}

