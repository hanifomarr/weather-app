<template>
    <header class="sticky top-0 bg-color-primary shadow-lg">
        <nav class="container flex flex-row items-center gap-4 text-color-secondary py-6">
            <RouterLink :to="{ name: 'home' }">
                <div class="flex items-center gap-3">
                    <i class="fa-solid fa-sun text-2xl"></i>
                    <p class="text-2xl text-white">Weather Application</p>
                </div>
            </RouterLink>
            <div class="flex gap-3 flex-1 justify-end">
                <i class="fa-solid fa-circle-info text-xl hover:text-white duration-150 cursor-pointer"
                    @click="toggleModal"></i>
                <i v-if="route.query.preview" class="fa-solid fa-plus text-xl hover:text-white duration-150 cursor-pointer" @click="addciy" ></i>
            </div>

            <InfoModal :modalActive="modalActive" @close-modal="toggleModal">
                <div class="text-black">
                    <h1 class="text-2xl mb-1">About:</h1>
                    <p class="mb-4">
                        The Local Weather allows you to track the current and
                        future weather of cities of your choosing.
                    </p>
                    <h2 class="text-2xl">How it works:</h2>
                    <ol class="list-disc list-inside mb-4">
                        <li>
                            Search for your city by entering the name into the
                            search bar.
                        </li>
                        <li>
                            Select a city within the results, this will take
                            you to the current weather for your selection.
                        </li>
                        <li>
                            Track the city by clicking on the "+" icon in the
                            top right. This will save the city to view at a
                            later time on the home page.
                        </li>
                    </ol>

                    <h2 class="text-2xl">Removing a city</h2>
                    <p>
                        If you no longer wish to track a city, simply select
                        the city within the home page. At the bottom of the
                        page, there will be am option to delete the city.
                    </p>
                </div>
            </InfoModal>
        </nav>
    </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router';
import InfoModal from './InfoModal.vue';
import { uid } from "uid";
import router from '@/router';

const savedCity: any = []
const route = useRoute()

const addciy = () => {
    if (localStorage.getItem("savedCity")) {
        savedCity.value = JSON.parse(localStorage.getItem("savedCity") || "")
    }
    const locationObj = {
        id: uid(),
        state: route.params.state,
        city: route.params.city,
        coords: {
            lat: route.query.lat,
            lng: route.query.lng,
        }
    }
    savedCity.push(locationObj);

    localStorage.setItem(
        "savedCity",
        JSON.stringify(savedCity)
    )
   
    let query = Object.assign({}, route.query);
    delete query.preview;
    router.replace({ query });
}


const modalActive = ref()
const toggleModal = () => { modalActive.value = !modalActive.value }


</script>