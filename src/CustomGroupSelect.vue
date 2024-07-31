<template>
  <v-select
    :modelValue="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
    :items="items"
    item-title="value"
    :label="label"
    variant="outlined"
    multiple
  >
    <template v-slot:item="{ item, on, attrs }">
      <v-list-item
        v-bind="attrs"
        v-if="item.raw.header"
        ripple
        @mousedown.prevent
        @click="toggleAll(item.raw.value)"
      >
        <v-icon>
          {{ allSelected(item.raw.value) ? 'mdi-minus-box' : 'mdi-checkbox-blank-outline' }}
        </v-icon>
        <span class="pl-2">{{ item.value }}</span>
      </v-list-item>
      <v-list-item
        v-bind="attrs"
        v-else
        ripple
        class="pl-12 d-flex"
        @mousedown.prevent
        @click="toggle(item.raw)"
      >
        <v-icon>
          {{ isSelected(item.raw) ? 'mdi-minus-box' : 'mdi-checkbox-blank-outline' }}
        </v-icon>
        <span class="pl-2">{{ item.value }}</span>
      </v-list-item>
      <v-divider class="mt-2"></v-divider>
    </template>
  </v-select>
</template>

<script>
export default {
  name: 'CustomGroupSelect',
  props: {
    items: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    allSelected(group) {
      const allFound = this.modelValue.filter((v) => v.group === group);
      const allFound2 = this.items.filter((v) => v.group === group);
      if (allFound2.length === 0) {
        const allFound = this.modelValue.filter((v) => v.value === group);
        return allFound.length === 1;
      }
      return allFound.length > 0 && allFound.length === allFound2.length;
    },
    isSelected(item) {
      return this.modelValue.some((v) => v.value === item.value);
    },
    toggle(item) {
      if (this.isSelected(item)) {
        this.$emit('update:modelValue', this.modelValue.filter((v) => v.value !== item.value));
      } else {
        this.$emit('update:modelValue', [...this.modelValue, item]);
      }
    },
    toggleAll(group) {
      const groupItems = this.items.filter((v) => v.group === group);
      if (groupItems.length === 0) {
        if (this.modelValue.some((v) => v.value === group)) {
          this.$emit('update:modelValue', this.modelValue.filter((v) => v.value !== group));
        } else {
          const headerValue = this.items.filter((v) => v.value === group);
          this.$emit('update:modelValue', [...this.modelValue, ...headerValue]);
        }
      } else if (this.modelValue.some((v) => v.group === group)) {
        this.$emit('update:modelValue', this.modelValue.filter((v) => v.group !== group));
      } else {
        this.$emit('update:modelValue', [...this.modelValue, ...groupItems]);
      }
    },
  },
};
</script>

<style scoped>
.pl-2 {
  padding-left: 0.5rem;
}
.pl-12 {
  padding-left: 3rem;
}
.d-flex {
  display: flex;
  align-items: center;
}
</style>
