<template>
  <div class="search-bar" >
    <input type="text" class="search-field" :placeholder='barPlaceholder' @keyup.enter='onEnterUp($event)' :style="barStyle" v-initFocus >
    <hr>
    <div class="filter-field" :style="{'paddingBottom': this.filterTitles.length === 0 ? 0 : 12 + 'px'}" >
      <button class="filter-button" v-if="filterTitles.length" v-for="(title, index) in titlesForFilterButtons" :key="index" @touchend="filterItem($event, index)" >{{ title }}</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SearchBar',
  data () {
    return {
      barStyle: {
        display: 'block',
        width: '92vw',
        height: '1.75rem',
        marginLeft: '4vw',
        borderRadius: '0.875rem'
      }
    }
  },
  props: {
    filterTitles: {
      type: Array,
      required: true
    }
  },
  directives: {
    initFocus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  computed: {
    barPlaceholder () {
      const self = this
      let path = self.$route.path
      if (path.indexOf('hotel') !== -1) {
        return '请输入饭店名称'
      } else if (path.indexOf('agency') !== -1) {
        return '请输入旅行社名称'
      } else {
        return '请输入景区相关信息'
      }
    },
    titlesForFilterButtons () {
      const [...result] = this.filterTitles
      return result
    }
  },
  methods: {
    onEnterUp (ev) {
      this.$emit('onSearch', ev.target.value)
    },
    filterItem (event, index) {
      // if (this.$route.path.indexOf('hotel' !== -1)) {
      var filterKey = event.target.textContent
      this.$emit('filter', filterKey)
      // } else if (this.$route.path.indexOf('scenic') !== -1) {
      // this.$emit('filter', )
      // }
    }
  }
}
</script>
<style lang="scss" scoped>
$barBackgound: #ffffff;
$barPaddingT: 12px;

$searchFieldBg: #f5f5f5;
$searchFieldBorderRadius: 5px;
$searchFieldTextIndent: 15px;
$searchFieldPlaceholderColor: #aaaaaa;

$filterFieldMarginLR: 4vw;
$fullWidth: 100vw;
$filterBtnBorder: 1px #2c7cff solid;
$filterBtnBg: #ffffff;
$filterBtnColor: #2c7cff;

.search-bar {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-top: $barPaddingT;
  background-color: $barBackgound;
}
.search-field {
  -webkit-appearance: none;
  border: none;
  background-color: $searchFieldBg;
  border-radius: $searchFieldBorderRadius;
  text-indent: $searchFieldTextIndent;

  &:focus {
    outline: none;
  }
  &::-webkit-input-placeholder {
    color: $searchFieldPlaceholderColor
  }
  &::-moz-placeholder {
    color: $searchFieldPlaceholderColor;
    padding-left: 8px
  }
}
.filter-field {
  display: flex;
  width: $fullWidth;
  margin-left: $filterFieldMarginLR;
  margin-right: $filterFieldMarginLR;
  padding: 0;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
.filter-button {
  border: $filterBtnBorder;
  background: $filterBtnBg;
  color: $filterBtnColor;
  border-radius: 0.75rem;
  box-sizing: border-box;
  height: 1.5rem;
  padding: 3px 0.95rem;
  margin-top: 12px;
}
hr {
  margin-top: 0.9375rem;
  margin-bottom: 0;
  width: $fullWidth;
  overflow: visible;
  border: none;
  height: 1px;
  background: $searchFieldBg;
}

</style>
