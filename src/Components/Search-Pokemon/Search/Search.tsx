import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import Bidoof404 from '../../../Assets/404-bidoof.png';
import Evolutions from '../Evolutions/Evolutions';
import PokemonStats from '../Stats/PokemonStats';
import Moves from '../Moves/Moves';
import pkmnInfoInit from '../../../Assets/json/pkmnInfoInit.json';
import pokemonList from '../../Tools/PokemonList';
import Autocomplete from '../../Tools/SearchEngine/SearchEngine';

import {
    Switch,
    Route,
    useRouteMatch,
    useHistory
} from "react-router-dom";

import {
    Image,
    Bidoof404Img,
    Title,
    Text,
    SearchContainer
} from './Styles';

type pokemonName = string[];
type pokemonInfo = {};

const SearchPokemon: React.FC<{}> = () =>{
    let match = useRouteMatch();
    const history = useHistory();
    const [pkmnName, setpkmnName] = React.useState<pokemonName>(['Luxray', 'luxray']);
    const [pkmnInfo, setpkmnInfo] = React.useState<pokemonInfo>(pkmnInfoInit);
    const [pkmnId, setpkmnId] = React.useState<number>(405);
    const [pkmnImg, setpkmnImg] = React.useState(<Image src={`https://pokeres.bastionbot.org/images/pokemon/405.png`} alt={'luxray'}/>);
    const [loading, setLoading] = React.useState(<div></div>);

    const searchByName = async () => {
        try {
            setLoading(<div>
                Loading...
            </div>);
            var apiUrl = 'https://pokeapi.co/api/v2/pokemon/' + pkmnName[1] + '/';
            const resp = await axios.get(apiUrl);
            setpkmnInfo(resp.data);
            setpkmnId(resp.data.id);
            setpkmnImg(<Image src={`${resp.data.sprites.other['official-artwork'].front_default}`} alt={resp.data.name}/>);
            setLoading(<div></div>);
            history.push(`${match.url}/stats`);
        }
        catch(err) {
            alert("Pokemon Not Found");
            setLoading(<div>
                <Bidoof404Img src={Bidoof404} alt={'404'}/>
            </div>);
            console.error(err);
        }
    }
    const searchWithParam = async (name: string) => {
        try {
            setLoading(
            <Row className="justify-content-center mt-5">
                <Col xs="auto">
                    <p>Loading...</p>
                </Col>
            </Row>);
            var apiUrl = 'https://pokeapi.co/api/v2/pokemon/' + name.toLowerCase() + '/';
            const resp = await axios.get(apiUrl);
            setpkmnInfo(resp.data);
            setpkmnId(resp.data.id);
            setpkmnImg(<Image src={`${resp.data.sprites.other['official-artwork'].front_default}`} alt={resp.data.name}/>);
            setLoading(<div></div>);
            history.push(`${match.url}/stats`);
        }
        catch(err) {
            alert("Pokemon Not Found");
            setLoading(
            <Row className="justify-content-center mt-5">
                <Col xs="auto">
                    <Bidoof404Img src={Bidoof404} alt={'404'}/>
                </Col>
            </Row>
            );
            console.error(err);
        }
    }
    const onValueChange = async (val: string, code: number) => {
        let temp = [];
        let formatName = '';
        let value = '';
        value = val.toLowerCase();
        value = value.replace(/\s/g, ''); //remove spaces
        if(value.length > 0) {
            formatName = value[0].toUpperCase() + value.slice(1, value.length);
        }
        temp.push(formatName);
        temp.push(value);
        setpkmnName(temp);
        if(code === 13) {
            searchWithParam(value);
        }
    }
    return (
        <SearchContainer>
            <Switch>
            <Route path={`${match.path}/stats`}>
                <PokemonStats pkmnId={pkmnId} pkmnName={pkmnName} pkmnInfo={pkmnInfo} pkmnImg={pkmnImg}/>
            </Route>
            <Route path={`${match.path}/evolution`}>
                <Evolutions pkmnName={pkmnName[0]}/>
            </Route>
            <Route path={`${match.path}/moves`}>
                <Moves pkmnInfo={pkmnInfo}/>
            </Route>
            <Route path={`${match.path}/`}>
                <Container className="full-height">
                    <Row className="full-height mt-5 mt-sm-4 mt-lg-5">
                        <Col xs={12}>
                            <Row className="justify-content-center mt-0 mt-lg-5">
                                <Col xs="auto">
                                    <Title>Search in the Pokedex:</Title>
                                </Col>
                            </Row>
                            <Row className="justify-content-center">
                                <Col xs="auto">
                                    <Text>(Eg: Pikachu, Snorlax)</Text>
                                </Col>
                            </Row>
                            <Row className="justify-content-center align-items-center mt-4">
                                <Col xs="auto">
                                    <Autocomplete options={pokemonList} onChangeValue={onValueChange} val={pkmnName[1]} search={searchByName}/>
                                </Col>
                            </Row>
                            {loading}
                        </Col>
                    </Row>
                </Container>
            </Route>
            </Switch>
        </SearchContainer>
    );
}

export default SearchPokemon;