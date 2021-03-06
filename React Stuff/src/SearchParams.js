import React, {useState, useEffect} from 'react';
import pet, {ANIMALS} from '@frontendmasters/pet'
import useDropdown from './useDropdown'

const SearchParams = () => {
    //const location = "Seattle, WA";
    const[location, setLocation] = useState("Seattle, WA"); //seattle is default case
    const[breeds, setBreeds] = useState([]);
    const[animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
    const[breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);p
    const[pets, setPets] = useState([]);

    async function requestPets() {
        const {animals} = await pet.animals({
            location,
            breed,
            type:animal
        })
    }



    useEffect(() => {
        setBreeds([]);
        setBreed("");
        // pet.breeds("dog").then(console.log,console.error);

        pet.breeds(animal).then(({breeds}) =>{
            const breedStrings = breeds.map(({name}) => name);
            setBreeds(breedStrings)
        })
    }, [animal, setBreed, setBreeds]) //these are the dpdcs on which the effect will run

    return (
        <div className = "search-params">
            <h1>{location}</h1>
            <form>
                <label htmlFor="location">
                    Location 
                    <input 
                    id = "location" 
                    value = {location}
                    placeholder = "Location" 
                    onChange={event => {
                        setLocation(event.target.value)}
                    }/>
                </label>
                <AnimalDropdown/>
                <BreedDropdown/>
                {/* <label htmlFor="animal">
                    Animal 
                    <select
                        id="animal"
                        value = {animal}
                        onChange= {e => setAnimal(e.target.value)} //part of hook in this case
                        onBlur = {e => setAnimal(e.target.value)} //part of hook for screen reader exception
                    >
                        <option> All </option> 
                        {ANIMALS.map(animal => (
                            <option key = {animal} value={animal}> {animal}</option> //key - doesn't update everything when something is moved on a list, performance improvement
                        ))}
                        </select>
                </label>
                <label htmlFor="breed">
                    Breed 
                    <select 
                        id="breed"
                        value = {breed}
                        onChange = {e => setBreed(e.target.value)}
                        onBlur = {e=> setBreed(e.target.value)}
                        disabled = {breeds.length === 0} //cannot click if breeds.length is 0
                    >
                        <option>All</option>
                        {breeds.map(breedString => (
                            <option key = {breedString} value={breedString}></option>
                        ))}
                    </select>
                </label> */}
                <button>Submit</button>
            </form>
        </div>
    )
}

export default SearchParams;