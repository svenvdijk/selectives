
<?php
    $dirs = array_filter(glob('*'), 'is_dir');
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="../index.css">
    <title>Social Directory</title>
</head>
<body>
    <?php
        foreach( $dirs as $dir ) {
            ?>
            <a href="./<?php echo $dir ?>" class="directory">
                <div class="container">
                    <svg id="map_open" width="40pt" height="40pt" viewBox="0 0 40 40" version="1.1"><g id="surface27265"><path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,62.745098%,0%);fill-opacity:1;" d="M 33.332031 10 L 18.332031 10 L 15 6.667969 L 6.667969 6.667969 C 4.832031 6.667969 3.332031 8.167969 3.332031 10 L 3.332031 16.667969 L 36.667969 16.667969 L 36.667969 13.332031 C 36.667969 11.5 35.167969 10 33.332031 10 Z M 33.332031 10 "/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,79.215686%,15.686275%);fill-opacity:1;" d="M 33.332031 10 L 6.667969 10 C 4.832031 10 3.332031 11.5 3.332031 13.332031 L 3.332031 30 C 3.332031 31.832031 4.832031 33.332031 6.667969 33.332031 L 33.332031 33.332031 C 35.167969 33.332031 36.667969 31.832031 36.667969 30 L 36.667969 13.332031 C 36.667969 11.5 35.167969 10 33.332031 10 Z M 33.332031 10 "/></g></svg>
                    <svg id="map_closed" width="40pt" height="40pt" viewBox="0 0 40 40" version="1.1"><g id="surface132139"><path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,62.745098%,0%);fill-opacity:1;" d="M 31.667969 10 L 18.332031 10 L 15 6.667969 L 6.667969 6.667969 C 4.832031 6.667969 3.332031 8.167969 3.332031 10 L 3.332031 30 C 3.332031 31.832031 4.832031 33.332031 6.667969 33.332031 L 32.5 33.332031 C 33.917969 33.332031 35 32.25 35 30.832031 L 35 13.332031 C 35 11.5 33.5 10 31.667969 10 Z M 31.667969 10 "/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,79.215686%,15.686275%);fill-opacity:1;" d="M 35.167969 15 L 12.75 15 C 11.167969 15 9.75 16.167969 9.5 17.75 L 6.667969 33.332031 L 33.082031 33.332031 C 34.667969 33.332031 36.082031 32.167969 36.332031 30.582031 L 38.417969 18.917969 C 38.832031 16.917969 37.25 15 35.167969 15 Z M 35.167969 15 "/></g></svg>
                </div>
                <sub><?php echo $dir ?></sub>
            </a>
            <?php
        }
    ?>
    
</body>
</html>