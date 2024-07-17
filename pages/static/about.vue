<template>
   <div id="about-us"></div>
   <div class="py-5 px-0 lg:px-5 md:px-5">
      <div class="px-5 lg:px-10 md:px-10">
         <div>
            <span class="text-2xl text-main-green font-bold">À propos de nous</span>
         </div>
         <div>
            <p>Bienvenue dans l'univers de CEND: <span class="font-bold">Connexion</span>, <span
                  class="font-bold">Enseignement</span>, <span class="font-bold">Novateur</span>,
               <span class="font-bold">Dynamique</span>.
            </p>
         </div>
         <div class="pt-4">
            <div class="pb-4">
               <span class="font-bold ">Qui sommes nous?</span>
            </div>
            <p class="text-sm font-light" id="our-mission">"Chez Cend, nous sommes passionnés par l'éducation et
               convaincus que chaque étudiant mérite un soutien personalisé pour atteindre son plein potentiel.</p>
            <p class="text-sm font-light">C'est pourquoi nous avons créé une application révolutionaire personalisée
               dans le monde entier.</p>
            <p class="text-sm font-light">Notre application simplifie la communication entre étudiants, parents, tuteurs
               et professeurs, tout en offrant une platforme de tutorat en ligne et en personne, adaptée à tous les
               niveaux scolaires, de la première année à l'université.</p>
               <Separator />
         </div>
         <div class="pt-4">
            <div class="pb-4">
               <span class="font-bold"> Notre mission</span>
            </div>
            <p class="text-sm font-light">Notre mission chez CEND est de rendre la réusite scolaire accessible à tous et
               donc, de permettre à tous les jeunes partout sur la planète d'atteindre leur job de rêve.</p>
            <p class="text-sm font-light" id="how-it-works">Nous la réussissons en mettant en relation des étudiants
               avec des tuteurs qualifiés, quels que soient le niveau d'études ou la localisation géographique.</p>
            <p class="text-sm font-light">Chez CEND nous croyons que l'apprentissage ne devrait pas connaître de
               frontières, c'est pourquoi nous avons conçu une plateforme qui favorise l'inclusion, la rapidité et la
               simplicité d'utilisation.</p>
               <Separator />
         </div>
         <div>
            <div class="py-4">
               <span class="font-bold"> Comment ça marche ?</span>
            </div>
            <div class="pb-4">
               <span class="font-bold">1.inscription facile</span>
               <p class="text-sm font-light">Rejoignez la communauté CEND en quelques cliques et créez votre profil
                  d'étudiants, de parent, de tuteur ou de professeur.</p>
            </div>
            <div class="pb-4">
               <span class="font-bold">2. Trouvez votre tuteur</span>
               <p class="text-sm font-light">Utilisez notre interface conviviale pour trouver le meilleur tuteur
                  qualifié selon vos besoins.</p>
            </div>
            <div class="pb-4">
               <span class="font-bold">3. Communiquez facilement</span>
               <p class="text-sm font-light">Restez en contact avec les membres de votre réseau éducatif ( tuteur,
                  professeur, parent et étudiant ) grâce à nos outils de communication intégrés.</p>
            </div>
            <div class="pb-4">
               <span class="font-bold">4. Programmez des sessions</span>
               <p class="text-sm font-light">Organisez des sessions de tutorat en ligne ou en personne, selon vos
                  besoins et votre emploi du temps.</p>
            </div>
            <div class="pb-4">
               <span class="font-bold">5. Suivi de la progression</span>
               <p class="text-sm font-light">
                  Suivez votre progression académique et ajustez votre plan d'études en fonction de vos besoins. <br>
                  Chez CEND, nous croyons en la puissance de la collaboration et de l'éducation personnalisée. <br>
                  Rejoinez-nous dès aujourd'hui pour créer des connexions significatives et donner à chaque étudiants
                  les clés du succès éducatif.
               </p>
            </div>
         </div>
         <div class="pt-4" id="cend-best-point">
            <div class="pb-4">
               <span class="font-bold"> Les points forts de CEND</span>
            </div>
            <div class="pb-4">
               <span class="font-bold">1. Connectivité instantannée</span>
               <p class="text-sm font-light">Trouver un tuteur en moins de 5 minutes grâce à notre système de mise en
                  relation rapide et efficace.</p>
            </div>
            <div class="pb-4">
               <span class="font-bold">2. Plateforme polyvalente</span>
               <p class="text-sm font-light">Que vous ayez besoin d'un soutien en ligne ou en présentiel, CEND offre une
                  expérience d'apprentissage adaptée à vos préférences.</p>
            </div>
            <div class="pb-4">
               <span class="font-bold">3. Proximité géographique</span>
               <p class="text-sm font-light">Localisez facilement les tuteurs disponibles prés de chez vous, pour un
                  soutien en personne lorsque cela est nécessaire.</p>
            </div>
            <div class="pb-4">
               <span class="font-bold">4. Inclusivité totale</span>
               <p class="text-sm font-light">Du primaire à l'université, CEND accompagne les étudiants à chaque étape de
                  leur parcours éducatif.</p>
            </div>
            <div class="pb-4">
               <span class="font-bold">5. Rapidité, simplicité, accessibilité</span>
               <p class="text-sm font-light">Ce sont les trois piliers qui définissent notre engagement envers une
                  expérience utilisateur exceptionnelle.</p>
            </div>
         </div>
      </div>
   </div>
</template>
<script setup lang="ts">
   import { Separator } from '@/components/ui/separator'
   const loading = useLoadingStore();
   const store = authenticationStore();
   
    setPageLayout(store.connected? "default": "onboarding");
    loading.hide();
   // definePageMeta({
   //    layout: false,
   // });
</script>