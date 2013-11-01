var path = require('path'),
    P = require('js-combinatorics').Combinatorics.P,
    groupsOf = require('in-groups-of'),
    grid = require('./grid');

var filename = path.join(__dirname, 'problem1input.txt');

//
// 1. Read the entire grid getting the meta information
// containing indicies counting open and closed cells by row and column
//
console.log('Reading ./problem1input.txt');
grid.read(filename, function (err, rows, meta) {
  if (err) {
    console.error('Error reading ./problem1input.txt: ' + err.message);
    return process.exit(1);
  }

  //
  // 2. Calculate which row and column indices have more than
  // five open cells
  //
  var available = ['rows', 'cols'].reduce(function (obj, key) {
    obj[key] = meta[key].open.reduce(function (indexes, n, i) {
      if (n >= 5) { indexes.push(i); }
      return indexes;
    }, []);

    return obj;
  }, {});

  //
  // ### function dumpAvailable (key)
  // Dumps the indicies and total open by row or col `key`
  //
  function dumpAvailable(key) {
    var groups = groupsOf(available[key], 5);

    groups.forEach(function (group) {
      console.log('      ' + group.map(function (i) {
        return i + '(' + meta[key].open[i] + ')';
      }).join(' '));
    })
  }

  //
  // 3. Dump some debugging information
  //
  console.log('Calculated ' + (available.rows.length + available.cols.length) + ' available rows and columns for five cards');
  console.log('  Rows: ' + available.rows.length);
  console.log('    Indexes');
  dumpAvailable('rows');
  console.log('  Cols: ' + available.cols.length);
  dumpAvailable('cols');

  //
  // 4. Sum computed permutations nCr for each of the available
  // rows and columns.
  //
  console.log('\nComputing permutations, nPr, of all rows and columns')
  var totals = ['rows', 'cols'].reduce(function (obj, key) {
    obj[key] = available[key].reduce(function (count, i) {
      var perms = P(meta[key].open[i], 5);
      console.log('  ' + key, i, meta[key].open[i] + 'P' + 5 + ' = ' + P(meta[key].open[i], 5))
      return count + perms;
    }, 0);

    return obj;
  }, {});

  console.log('\nCalculated ' + (totals.rows + totals.cols) + ' possible combinations of five cards');
  console.log('  Rows: ' + totals.rows);
  console.log('  Cols: ' + totals.cols);
});