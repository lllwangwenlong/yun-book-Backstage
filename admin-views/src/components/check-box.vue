<template>
  <label class="check-box">
    <input type="checkbox" class="check-box-input" v-model="currentValue" value="998">
    <span class="check-wrap"></span>
  </label>
</template>

<script>
    export default {
      props: {
        value: {
          type: [String, Number]
        }
      },
      data () {
        return {
          currentValue: ''
        }
      },
      watch: {
        currentValue (val) {
          this.$emit('change', val)
          this.$emit('input', val)
        },
        value () {
          this.currentValue = this.value
        }
      }
    }
</script>

<style scoped lang="scss">
.check-box {
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 1px solid #e8e8e8;
  border-radius: 4px;

  .check-wrap {
    transform: scale(0);
    position: relative;
    display: inline-block;
    width: 100%;
    height: 100%;
  }

  .check-box-input {
    display: none;
  }

  .check-box-input:checked + .check-wrap {
    transition: transform .05s ease;
    transform: scale(1);
    background-color: #409eff;
  }

  .check-box-input:checked + .check-wrap::after {
    content: '';
    position: absolute;
    top: 40%;
    left: 50%;
    display: block;
    width: 30px;
    height: 14px;
    border-left: 4px solid #fff;
    border-bottom: 4px solid #fff;
    transform: translate(-50%, -50%) rotate(-45deg);
  }
}
</style>
