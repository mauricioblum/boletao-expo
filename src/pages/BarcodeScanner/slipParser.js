/* eslint-disable func-names */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
export const BankslipParser = () => {
  // Return a block by string
  const block = function(string, start, end) {
    return string.slice(start, end);
  };

  const general_dv = function(bankslip) {
    return block(bankslip, 4, 5);
  };

  const currency_info = function(bankslip) {
    return block(bankslip, 3, 4);
  };

  const bank_info = function(bankslip) {
    return block(bankslip, 0, 3);
  };

  const duedate_factor = function(bankslip) {
    return block(bankslip, 5, 9);
  };

  const amount = function(bankslip) {
    return block(bankslip, 9, 19);
  };

  // Generate multiply sequence eg.: [2, 1, 2]
  function multiply_sequence(len) {
    const bars = [];
    let start_dig = 2;

    for (let i = 0; i < len; i++) {
      bars.push(start_dig);
      if (start_dig === 1) {
        start_dig++;
      } else {
        start_dig--;
      }
    }
    return bars;
  }

  // Generate digit verificator
  function get_sum_from_sequence(seq) {
    let bar = [];
    const mseq = multiply_sequence(seq.length).reverse();

    mseq.forEach(function(value, index) {
      bar.push(value * parseInt(seq[index], 10));
    });

    const string_bar = bar.join('');
    let bar_value = 0;
    bar = Array.from(string_bar);

    bar.forEach(function(value) {
      bar_value += parseInt(value, 10);
    });

    return 10 - (bar_value % 10);
  }

  // Receive a string array and return a string appended DV
  const append_dv_block = function(array_data) {
    const str = array_data.join('');
    return str.concat(get_sum_from_sequence(str));
  };

  const bankslip_segment_1 = function(bankslip) {
    return append_dv_block([
      bank_info(bankslip),
      currency_info(bankslip),
      block(bankslip, 19, 24),
    ]);
  };

  const bankslip_segment_2 = function(bankslip) {
    return append_dv_block([block(bankslip, 24, 34)]);
  };

  const bankslip_segment_3 = function(bankslip) {
    return append_dv_block([block(bankslip, 34, 44)]);
  };

  const bankslip_segment_4 = function(bankslip) {
    return [duedate_factor(bankslip), amount(bankslip)].join('');
  };

  const bankslip = function(bankslip_number) {
    return [
      bankslip_segment_1(bankslip_number),
      bankslip_segment_2(bankslip_number),
      bankslip_segment_3(bankslip_number),
      general_dv(bankslip_number),
      bankslip_segment_4(bankslip_number),
    ].join('');
  };

  return {
    parse: bankslip,
  };
};
