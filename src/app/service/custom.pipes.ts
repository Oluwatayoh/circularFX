import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'wz_money_format' })
export class MoneyFormat implements PipeTransform {
  transform(value: number, args: string[]): any {
    if (!value) return '-';
    return parseFloat(value + '').toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  }
}

@Pipe({ name: 'wz_naira_money_format' })
export class MoneyFormatInNaira implements PipeTransform {
  transform(value: any): any {
    if (!value) return '-';
    return '₦' + parseFloat(value + '').toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  }
}

@Pipe({ name: 'wz_naira_no_decimal_money_format' })
export class NoDecimalMoneyFormatInNaira implements PipeTransform {
  transform(value: number, args: string[]): any {
    if (!value) return '-';
    return '₦' + parseFloat(value + '').toLocaleString();
  }
}


@Pipe({ name: 'capitalize' })
export class CapitalizePipe implements PipeTransform {
  transform(value: any) {
    if (value) {
      value = value.replace(/_/g, ' ');
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }
    return value;
  }
}

@Pipe({ name: 'wz_counter_format' })
export class CounterFormat implements PipeTransform {
  transform(value: number, args: string[]): any {
    if (!value) return '00';
    if (value < 10) return '0' + value;
    return value + ''.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  }
}

@Pipe({ name: 'wz_phone_number' })
export class PhoneNumberPipe implements PipeTransform {
  public new_number: any;
  transform(value: number): any {
    if (value) {
      if (value.toString().charAt(0) !== '0') {
        this.new_number = '0' + value;
      }
      return this.new_number;
    }
    return value;
  }
}

@Pipe({ name: 'wz_thousand_suffix' })
export class ThousandSuffixPipe implements PipeTransform {
  transform(input: any, args?: any, isAmount?: boolean, isNumericTIle?: boolean): any {
    var exp, rounded,
      suffixes = ['k', 'm', 'b', 't', 'q', 'e'];

    // if it is not a number
    if (Number.isNaN(input)) {
      return null;
    }

    // if input is null or is equal to 0
    if (input == null || input == 0) {
      return '-';
    }

    exp = Math.floor(Math.log(input) / Math.log(1000));

    if (isNumericTIle) {
      if (input > 99999) {
        return (isAmount ? '₦' : '') + (input / Math.pow(1000, exp)).toFixed(args) + suffixes[exp - 1];
      }
      if (isAmount) {
        return '₦' + parseFloat(input + '').toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
      } else {
        return Number(input).toLocaleString();
      }
    } else {
      if (input < 1000) {
        if (args) {
          return (isAmount ? '₦' : '') + input.toFixed(args).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        }
        return (isAmount ? '₦' : '') + Number(input).toLocaleString();
      }
    }
    return (isAmount ? '₦' : '') + (input / Math.pow(1000, exp)).toFixed(args) + suffixes[exp - 1];

  }
}

@Pipe({ name: 'elipses' })
export class ElipsesPipe implements PipeTransform {
  transform(value: any) {
    if (value.length > 30) {
      let a = value.toString().substr(0, 30)
      return `${a}...`
    }
    return value;
  }
}

@Pipe({ name: 'sentenceCase' })
export class SentenceCase implements PipeTransform {
  transform(value: any) {
    if (value) {
      value = value.replace(/_/g, ' ');
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }
    return value;
  }
}

@Pipe({ name: 'determineDay' })
export class DetermineDayPipe implements PipeTransform {
  transform(value: string): string {
    const date = new Date();
    const date1 = new Date();
    const dateString = date.toString();
    const month = date1.getMonth() + 1 <= 9 ? `0${date1.getMonth() + 1}` : date1.getMonth() + 1
    const yesterday = parseInt(dateString.slice(8, 10), 10) - 1;
    const todaysDate = `${dateString.slice(8, 10)}-${month}-${dateString.slice(11, 15)}`
    const yesterdaysDate = `${dateString.slice(11, 15)}-${month}-${yesterday}`
    if (value == todaysDate) {
      return 'Today';
    }
    if (value == yesterdaysDate) {
      return 'Yesterday';
    }
    
    return value
  }
}




@Pipe({
  name: "searchPipe"
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    return items.filter(item => {
      return Object.keys(item).some(key => {
        return String(item[key])
          .toLowerCase()
          .includes(searchText.toLowerCase());
      });
    });
  }
}

