<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {toTypedSchema} from "@vee-validate/zod";
import * as z from "zod";
import {useForm} from "vee-validate";
import {FormControl, FormField, FormItem, FormLabel} from "~/components/ui/form";

const formSchema = toTypedSchema(z.object({
  reference: z.string(),
  message: z.string(),
  language: z.string(),
}))

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit( async (values) => {
  console.log(values)
})

</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline">
        Nouvelle entrée
      </Button>
    </DialogTrigger>
    <DialogContent >
      <DialogHeader>
        <DialogTitle>Nouveau message</DialogTitle>
      </DialogHeader>
      <div>
        <form class="space-y-6" @submit="onSubmit">
          <FormField v-slot="{ componentField }" name="reference" :validate-on-blur="!isFieldDirty">
            <FormItem>
              <FormLabel>référence</FormLabel>
              <FormControl v-bind="componentField">
                <CommonFormInput type="text" placeholder="Votre email" />
              </FormControl>
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="message" :validate-on-blur="!isFieldDirty">
            <FormItem>
              <FormLabel>référence</FormLabel>
              <FormControl v-bind="componentField">
                <Textarea id="content" placeholder="You are a..." class="h-[200px]" />
              </FormControl>
            </FormItem>
          </FormField>
          <CommonFormSubmit />
        </form>
      </div>
    </DialogContent>
  </Dialog>
</template>