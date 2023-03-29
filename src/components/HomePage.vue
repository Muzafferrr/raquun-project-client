<template>
    <div class="card m-5 p-5">
        <div class="d-flex align-items-start">
            <div class="nav flex-column nav-pills me-3 my-auto" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <button class="nav-link active" id="v-pills-country-tab" data-bs-toggle="pill"
                    data-bs-target="#v-pills-country" type="button" role="tab" aria-controls="v-pills-country"
                    aria-selected="true">Countries</button>
                <button class="nav-link" id="v-pills-city-tab" data-bs-toggle="pill" data-bs-target="#v-pills-city"
                    type="button" role="tab" aria-controls="v-pills-city" aria-selected="false">Cities</button>
            </div>
            <div class="tab-content" id="v-pills-tabContent">
                <div class="tab-pane fade show active" id="v-pills-country" role="tabpanel"
                    aria-labelledby="v-pills-country-tab" tabindex="0">
                    <div class="d-flex flex-row justify-content-between">
                        <div>
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                data-bs-target="#addCountryModal">Add
                                Country</button>
                        </div>
                        <div class="d-flex flex-row w-unset">
                            <label for="countrySearch" class="mx-2 py-1">Search</label>
                            <input type="text" id="countrySearch" class="form-control form-control-sm mb-4"
                                v-model="countrySearch">
                        </div>
                    </div>
                    <easy-data-table :headers="countryHeaders" :items="countries" :search-value="countrySearch" alternating
                        buttons-pagination>
                        <template #item-operation="item">
                            <div class="d-flex flex-row gap-2">
                                <button class="btn btn-sm btn-danger" type="button"
                                    v-on:click="deleteCountry(item.id)">Delete</button>
                                <button class="btn btn-sm btn-warning" type="button" data-bs-toggle="modal"
                                    data-bs-target="#editCountryModal"
                                    v-on:click="openEditCountryModal(item.id)">Edit</button>
                            </div>
                        </template>
                    </easy-data-table>
                </div>
                <div class="tab-pane fade" id="v-pills-city" role="tabpanel" aria-labelledby="v-pills-city-tab"
                    tabindex="0">
                    <div class="d-flex flex-row justify-content-between">
                        <div>
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                data-bs-target="#addCityModal">Add
                                City</button>
                        </div>
                        <div class="d-flex flex-row w-unset">
                            <label for="citySearch" class="mx-2 py-1">Search</label>
                            <input type="text" id="citySearch" class="form-control form-control-sm mb-4"
                                v-model="citySearch">
                        </div>
                    </div>
                    <easy-data-table :headers="cityHeaders" :items="cities" :search-value="citySearch" alternating
                        buttons-pagination>
                        <template #item-operation="item">
                            <div class="d-flex flex-row gap-2">
                                <button class="btn btn-sm btn-danger" type="button"
                                    v-on:click="deleteCity(item.id)">Delete</button>
                                <button class="btn btn-sm btn-warning" type="button" data-bs-toggle="modal"
                                    data-bs-target="#editCityModal" v-on:click="openEditCityModal(item.id)">Edit</button>
                            </div>
                        </template>
                    </easy-data-table>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="addCityModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add City</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12">
                            <label for="cityName" class="form-label fw-bold">Name</label>
                            <input type="text" class="form-control" ref="cityName" v-model="city.name">
                        </div>
                        <div class="col-12">
                            <label for="cityDescription" class="form-label fw-bold">Description</label>
                            <textarea type="text" rows="5" class="form-control" ref="cityDescription"
                                v-model="city.description"></textarea>
                        </div>
                        <div class="col-6">
                            <label for="cityPhoneCode" class="form-label fw-bold">Phone Code</label>
                            <input type="text" class="form-control" ref="cityPhoneCode" v-model="city.phoneCode">
                        </div>
                        <div class="col-6">
                            <label for="cityPlateCode" class="form-label fw-bold">Plate Code</label>
                            <input type="number" min="0" class="form-control" ref="cityPlateCode" v-model="city.plateCode">
                        </div>
                        <div class="col-6">
                            <label for="citySurface" class="form-label fw-bold">Surface</label>
                            <input type="number" min="0" class="form-control" ref="citySurface" v-model="city.surface">
                        </div>
                        <div class="col-6">
                            <label for="cityPopulation" class="form-label fw-bold">Population</label>
                            <input type="number" min="0" class="form-control" ref="cityPopulation"
                                v-model="city.population">
                        </div>
                        <div class="col-12">
                            <label for="cityMayor" class="form-label fw-bold">Mayor</label>
                            <input type="text" class="form-control" ref="cityMayor" v-model="city.mayor">
                        </div>
                        <div class="col-12">
                            <label for="countryId" class="form-label fw-bold">Country</label>
                            <select class="form-select" ref="countryId" v-model="city.countryId">
                                <option v-for="country in countries" :key="country.id" :value="country.id">
                                    {{ country.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" v-on:click="addCity">Save changes</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="editCityModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Edit City</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12">
                            <label for="updatedCityName" class="form-label fw-bold">Name</label>
                            <input type="text" class="form-control" ref="updatedCityName" v-model="updatedCity.name">
                        </div>
                        <div class="col-12">
                            <label for="updatedCityDescription" class="form-label fw-bold">Description</label>
                            <textarea type="text" rows="5" class="form-control" ref="updatedCityDescription"
                                v-model="updatedCity.description"></textarea>
                        </div>
                        <div class="col-6">
                            <label for="updatedCityPhoneCode" class="form-label fw-bold">Phone Code</label>
                            <input type="text" class="form-control" ref="updatedCityPhoneCode"
                                v-model="updatedCity.phoneCode">
                        </div>
                        <div class="col-6">
                            <label for="updatedCityPlateCode" class="form-label fw-bold">Plate Code</label>
                            <input type="number" class="form-control" ref="updatedCityPlateCode"
                                v-model="updatedCity.plateCode">
                        </div>
                        <div class="col-6">
                            <label for="updatedCitySurface" class="form-label fw-bold">Surface</label>
                            <input type="number" class="form-control" ref="updatedCitySurface"
                                v-model="updatedCity.surface">
                        </div>
                        <div class="col-6">
                            <label for="updatedCityPopulation" class="form-label fw-bold">Population</label>
                            <input type="number" class="form-control" ref="updatedCityPopulation"
                                v-model="updatedCity.population">
                        </div>
                        <div class="col-12">
                            <label for="updatedCityMayor" class="form-label fw-bold">Mayor</label>
                            <input type="text" class="form-control" ref="updatedCityMayor" v-model="updatedCity.mayor">
                        </div>
                        <div class="col-12">
                            <label for="updatedCountryId" class="form-label fw-bold">Country</label>
                            <select class="form-select" ref="updatedCountryId" v-model="updatedCity.countryId">
                                <option v-for="country in countries" :key="country.id" :value="country.id">
                                    {{ country.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" v-on:click="editCity">Save changes</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="addCountryModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add Country</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12">
                            <label for="countryName" class="form-label fw-bold">Name</label>
                            <input type="text" class="form-control" ref="countryName" v-model="country.name">
                        </div>
                        <div class="col-12">
                            <label for="countryDescription" class="form-label fw-bold">Description</label>
                            <textarea type="text" rows="5" class="form-control" ref="countryDescription"
                                v-model="country.description"></textarea>
                        </div>
                        <div class="col-6">
                            <label for="countryCapital" class="form-label fw-bold">Capital</label>
                            <input type="text" class="form-control" ref="countryCapital" v-model="country.capital">
                        </div>
                        <div class="col-6">
                            <label for="countryPhoneCode" class="form-label fw-bold">Phone Code</label>
                            <input type="text" class="form-control" ref="countryPhoneCode" v-model="country.phoneCode">
                        </div>
                        <div class="col-6">
                            <label for="countrySurface" class="form-label fw-bold">Surface</label>
                            <input type="number" min="0" class="form-control" ref="countrySurface"
                                v-model="country.surface">
                        </div>
                        <div class="col-6">
                            <label for="countryPopulation" class="form-label fw-bold">Population</label>
                            <input type="number" min="0" class="form-control" ref="countryPopulation"
                                v-model="country.population">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" v-on:click="addCountry">Save changes</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="editCountryModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Edit Country</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12">
                            <label for="updatedCountryName" class="form-label fw-bold">Name</label>
                            <input type="text" class="form-control" ref="updatedCountryName" v-model="updatedCountry.name">
                        </div>
                        <div class="col-12">
                            <label for="updatedCountryDescription" class="form-label fw-bold">Description</label>
                            <textarea type="text" rows="5" class="form-control" ref="updatedCountryDescription"
                                v-model="updatedCountry.description"></textarea>
                        </div>
                        <div class="col-6">
                            <label for="updatedCountryCapital" class="form-label fw-bold">Capital</label>
                            <input type="text" class="form-control" ref="updatedCountryCapital"
                                v-model="updatedCountry.capital">
                        </div>
                        <div class="col-6">
                            <label for="updatedCountryPhoneCode" class="form-label fw-bold">Phone Code</label>
                            <input type="text" class="form-control" ref="updatedCountryPhoneCode"
                                v-model="updatedCountry.phoneCode">
                        </div>
                        <div class="col-6">
                            <label for="updatedCountrySurface" class="form-label fw-bold">Surface</label>
                            <input type="number" min="0" class="form-control" ref="updatedCountrySurface"
                                v-model="updatedCountry.surface">
                        </div>
                        <div class="col-6">
                            <label for="updatedCountryPopulation" class="form-label fw-bold">Population</label>
                            <input type="number" min="0" class="form-control" ref="updatedCountryPopulation"
                                v-model="updatedCountry.population">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" v-on:click="editCountry">Save changes</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import EasyDataTable from 'vue3-easy-data-table';
export default {
    data() {
        return {
            cities: [],
            city: {
                name: "",
                description: "",
                phoneCode: "",
                plateCode: 0,
                surface: 0,
                population: 0,
                mayor: "",
                countryId: 0
            },
            updatedCity: {
                id: 0,
                name: "",
                description: "",
                phoneCode: "",
                plateCode: 0,
                surface: 0,
                population: 0,
                mayor: "",
                countryId: 0
            },
            cityHeaders: [
                { text: "Id", value: "id", sortable: true },
                { text: "Name", value: "name", sortable: true },
                { text: "Description", value: "description", sortable: false },
                { text: "Plate Code", value: "plateCode", sortable: true },
                { text: "Population", value: "population", sortable: true },
                { text: "Surface", value: "surface", sortable: true },
                { text: "Phone Code", value: "phoneCode", sortable: true },
                { text: "Mayor", value: "mayor", sortable: true },
                { text: "Country", value: "country.name", sortable: true },
                { text: "Operation", value: "operation", sortable: false },
            ],
            citySearch: "",
            countries: [],
            country: {
                name: "",
                description: "",
                phoneCode: "",
                capital: "",
                surface: 0,
                population: 0
            },
            updatedCountry: {
                id: 0,
                name: "",
                description: "",
                phoneCode: "",
                capital: "",
                surface: 0,
                population: 0
            },
            countryHeaders: [
                { text: "Id", value: "id", sortable: true },
                { text: "Name", value: "name", sortable: true },
                { text: "Description", value: "description", sortable: false },
                { text: "Capital City", value: "capital", sortable: true },
                { text: "Population", value: "population", sortable: true },
                { text: "Surface", value: "surface", sortable: true },
                { text: "Phone Code", value: "phoneCode", sortable: true },
                { text: "Operation", value: "operation", sortable: false },
            ],
            countrySearch: "",
        }
    },
    components: {
        EasyDataTable
    },
    methods: {
        addCountry() {
            if (this.checkCountryValidation()) {
                axios.post(this.hostname + "/api/Countries/", this.country, this.getTokenConfig())
                    .then(response => {
                        if (response.data.data.id > 0) {
                            Swal.fire("Successfully added country!").then(() => {
                                location.reload();
                            });
                        }
                        else {
                            Swal.fire("An error occured. Please try again!");
                        }
                    }).catch(error => {
                        if (error.response) {
                            Swal.fire(error.response.data);
                        }
                    });
            }
        },
        editCountry() {
            if (this.checkUpdatedCountryValidation()) {
                axios.put(this.hostname + "/api/Countries/" + this.updatedCountry.id, this.updatedCountry, this.getTokenConfig())
                    .then(response => {
                        if (response.data.data.id > 0) {
                            Swal.fire("Successfully updated country!").then(() => {
                                location.reload();
                            });
                        }
                        else {
                            Swal.fire("An error occured. Please try again!");
                        }
                    }).catch(error => {
                        if (error.response) {
                            Swal.fire(error.response.data);
                        }
                    });
            }
        },
        openEditCountryModal(countryId) {
            let currentCountry = this.countries.find(x => x.id == countryId);
            this.updatedCountry.id = countryId;
            this.updatedCountry.name = currentCountry.name;
            this.updatedCountry.description = currentCountry.description;
            this.updatedCountry.phoneCode = currentCountry.phoneCode;
            this.updatedCountry.capital = currentCountry.capital;
            this.updatedCountry.surface = currentCountry.surface;
            this.updatedCountry.population = currentCountry.population;
        },
        deleteCountry(countryId) {
            axios.delete(this.hostname + "/api/Countries/" + countryId, this.getTokenConfig())
                .then(response => {
                    if (response.data.success) {
                        Swal.fire("Successfully deleted country!").then(() => {
                            location.reload();
                        });
                    }
                    else {
                        Swal.fire("An error occured. Please try again!");
                    }
                }).catch(error => {
                    if (error.response) {
                        Swal.fire(error.response.data);
                    }
                });
        },
        checkCountryValidation() {
            if (!this.country.name) {
                this.$refs.countryName.focus();
                Swal.fire("Please enter a valid country name!");
                return;
            }
            return true;
        },
        checkUpdatedCountryValidation() {
            if (!this.updatedCountry.name) {
                this.$refs.updatedCountryName.focus();
                Swal.fire("Please enter a valid country name!");
                return;
            }
            return true;
        },
        addCity() {
            if (this.checkCityValidation()) {
                axios.post(this.hostname + "/api/Cities/", this.city, this.getTokenConfig())
                    .then(response => {
                        if (response.data.data.id > 0) {
                            Swal.fire("Successfully added city!").then(() => {
                                location.reload();
                            });
                        }
                        else {
                            Swal.fire("An error occured. Please try again!");
                        }
                    }).catch(error => {
                        if (error.response) {
                            Swal.fire(error.response.data);
                        }
                    });
            }
        },
        editCity() {
            if (this.checkUpdatedCityValidation()) {
                axios.put(this.hostname + "/api/Cities/" + this.updatedCity.id, this.updatedCity, this.getTokenConfig())
                    .then(response => {
                        if (response.data.data.id > 0) {
                            Swal.fire("Successfully updated city!").then(() => {
                                location.reload();
                            });
                        }
                        else {
                            Swal.fire("An error occured. Please try again!");
                        }
                    }).catch(error => {
                        if (error.response) {
                            Swal.fire(error.response.data);
                        }
                    });
            }
        },
        openEditCityModal(cityId) {
            let currentCity = this.cities.find(x => x.id == cityId);
            this.updatedCity.id = cityId;
            this.updatedCity.name = currentCity.name;
            this.updatedCity.description = currentCity.description;
            this.updatedCity.phoneCode = currentCity.phoneCode;
            this.updatedCity.plateCode = currentCity.plateCode;
            this.updatedCity.surface = currentCity.surface;
            this.updatedCity.population = currentCity.population;
            this.updatedCity.mayor = currentCity.mayor;
            this.updatedCity.countryId = currentCity.countryId;
        },
        deleteCity(cityId) {
            axios.delete(this.hostname + "/api/Cities/" + cityId, this.getTokenConfig())
                .then(response => {
                    if (response.data.success) {
                        Swal.fire("Successfully deleted city!").then(() => {
                            location.reload();
                        });
                    }
                    else {
                        Swal.fire("An error occured. Please try again!");
                    }
                }).catch(error => {
                    if (error.response) {
                        Swal.fire(error.response.data);
                    }
                });
        },
        checkCityValidation() {
            if (!this.city.name) {
                this.$refs.cityName.focus();
                Swal.fire("Please enter a valid city name!");
                return;
            }
            if (!this.city.countryId) {
                this.$refs.countryId.focus();
                Swal.fire("Please select a country!");
                return;
            }
            return true;
        },
        checkUpdatedCityValidation() {
            if (!this.updatedCity.name) {
                this.$refs.updatedCityName.focus();
                Swal.fire("Please enter a valid city name!");
                return;
            }
            if (!this.updatedCity.countryId) {
                this.$refs.updatedCountryId.focus();
                Swal.fire("Please select a country!");
                return;
            }
            return true;
        },
        getTokenConfig() {
            var token = JSON.parse(localStorage.getItem('token'));
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            return config;
        },
        async getCities() {
            await axios.get(this.hostname + "/api/Cities/", this.getTokenConfig())
                .then(response => {
                    this.cities = response.data
                })
                .catch(error => {
                    if (error.response) {
                        Swal.fire(error.response.data)
                    }
                })
        },
        async getCountries() {
            await axios.get(this.hostname + "/api/Countries/", this.getTokenConfig())
                .then(response => {
                    this.countries = response.data
                })
                .catch(error => {
                    if (error.response) {
                        Swal.fire(error.response.data)
                    }
                })
        }
    },
    async created() {
        await this.getCities();
        await this.getCountries();
    }
}
</script>