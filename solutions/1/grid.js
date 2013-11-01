var fs = require('fs');

//
// ### function read (filename)
// Reads the grid at the given filename
//
exports.read = function (filename, callback) {
  fs.readFile(filename, 'utf8', function (err, data) {
    if (err) { return callback(err) }

    var meta = {
      rows: { open: [], closed: [] },
      cols: { open: [], closed: [] }
    };

    //
    // TODO: Validate the input data before returning.
    //
    return callback(
      null,
      data.split('\n')
        .map(function (row, i) {
          return row
            .split('')
            .map(function (cell, j) {
              var open = cell === '*',
                  key  = open ? 'open' : 'closed';

              meta.rows[key][i] = meta.rows[key][i] || 0;
              meta.rows[key][i]++;
              meta.cols[key][j] = meta.cols[key][j] || 0;
              meta.cols[key][j]++;

              return open;
            });
        }),
      meta
    );
  });
};

//
// ### function write (filename, grid)
// Writes the grid to the specified 
//
exports.write = function (filename, grid, callback) {
  fs.writeFile(
    filename,
    grid.map(function (row) {
      return row.reduce(function (cell) {
        return cell ? 'X' : '*';
      }, '');
    }).join('\n'),
    'utf8',
    callback
  );
};