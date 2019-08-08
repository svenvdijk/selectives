<?php
    $dirs = array_filter(glob('*'), 'is_dir');

    // Images
    $images = glob("{*.jpg,*.jpeg,*.png,*.gif,*.JPG,*.JPEG,*.PNG,*.GIF}", GLOB_BRACE);
    $imgs = array();
    foreach($images as $image){ $imgs[] = $image; }
    //End of Images
    $text_files = glob("*.txt");
    $txt = array();
    foreach($text_files as $text_file) { $txt = $text_file; }
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="../index.css">
    <title>Directory Summary</title>
</head>
<body>
    <div>
        <input value="Previous Page" type="button" onclick="goToPreviousURL();"></input>
    </div>
    <?php
        foreach( $dirs as $dir ) {
            $dirname = './' . $dir . '/';
            ?>
            <div class="directory dir_folder">
                <div class="container">
                    <svg id="map_open" width="40pt" height="40pt" viewBox="0 0 40 40" version="1.1"><g id="surface27265"><path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,62.745098%,0%);fill-opacity:1;" d="M 33.332031 10 L 18.332031 10 L 15 6.667969 L 6.667969 6.667969 C 4.832031 6.667969 3.332031 8.167969 3.332031 10 L 3.332031 16.667969 L 36.667969 16.667969 L 36.667969 13.332031 C 36.667969 11.5 35.167969 10 33.332031 10 Z M 33.332031 10 "/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,79.215686%,15.686275%);fill-opacity:1;" d="M 33.332031 10 L 6.667969 10 C 4.832031 10 3.332031 11.5 3.332031 13.332031 L 3.332031 30 C 3.332031 31.832031 4.832031 33.332031 6.667969 33.332031 L 33.332031 33.332031 C 35.167969 33.332031 36.667969 31.832031 36.667969 30 L 36.667969 13.332031 C 36.667969 11.5 35.167969 10 33.332031 10 Z M 33.332031 10 "/></g></svg>
                    <svg id="map_closed" width="40pt" height="40pt" viewBox="0 0 40 40" version="1.1"><g id="surface132139"><path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,62.745098%,0%);fill-opacity:1;" d="M 31.667969 10 L 18.332031 10 L 15 6.667969 L 6.667969 6.667969 C 4.832031 6.667969 3.332031 8.167969 3.332031 10 L 3.332031 30 C 3.332031 31.832031 4.832031 33.332031 6.667969 33.332031 L 32.5 33.332031 C 33.917969 33.332031 35 32.25 35 30.832031 L 35 13.332031 C 35 11.5 33.5 10 31.667969 10 Z M 31.667969 10 "/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,79.215686%,15.686275%);fill-opacity:1;" d="M 35.167969 15 L 12.75 15 C 11.167969 15 9.75 16.167969 9.5 17.75 L 6.667969 33.332031 L 33.082031 33.332031 C 34.667969 33.332031 36.082031 32.167969 36.332031 30.582031 L 38.417969 18.917969 C 38.832031 16.917969 37.25 15 35.167969 15 Z M 35.167969 15 "/></g></svg>
                </div>
                <sub><?php echo $dir ?></sub>

                <div class="hidden dropdown">
                    <?php
                        // Open a directory, and read its contents
                        if (is_dir($dirname)){
                            if ($dh = opendir($dirname)){
                                while (($file = readdir($dh)) !== false){
                                    ?>
                                        <li> 
                                            <a href="<?php echo $dirname . $file ?> ">
                                                <?php echo $file ?> 
                                            </a>
                                        </li>
                                    <?php
                                }
                                closedir($dh);
                            }
                        }
                    ?>
                    
                </div>
                    </div>
            <?php
        }
    ?>


    <?php
        foreach( $images as $image ) {
            ?>
            <a href="./<?php echo $image ?>" class="directory">
                <div class="container">
                    <img src="./<?php echo $image ?>" alt="" width="40pt" height="40pt">
                </div>
                <sub><?php echo $image ?></sub>
            </a>
            <?php
        }
        foreach( $text_files as $text_file ) {
            ?>
            <a href="./<?php echo $text_file ?>" class="directory">
                <div class="container">
                <svg width="40pt" height="40pt" id="txt_folder" x="0px" y="0px" viewBox="0 0 318.188 318.188" style="enable-background:new 0 0 318.188 318.188;" version="1.1"><g><polygon style="fill:#E8E8E8;" points="227.321,7.5 40.342,7.5 40.342,310.688 277.846,310.688 277.846,58.025 "/><g><rect x="100.317" y="173.87" style="fill:#D1D3D3;" width="49.543" height="12.865"/><rect x="100.317" y="149.229" style="fill:#D1D3D3;" width="107.543" height="12.865"/><rect x="100.317" y="124.587" style="fill:#D1D3D3;" width="117.551" height="12.865"/><rect x="100.317" y="99.945" style="fill:#D1D3D3;" width="82.209" height="12.865"/><rect x="100.317" y="75.304" style="fill:#D1D3D3;" width="117.551" height="12.865"/></g><polygon style="fill:#A4A9AD;" points="235.14,32.763 40.342,32.763 40.342,7.5 227.321,7.5 "/><polygon style="fill:#D1D3D3;" points="227.321,58.025 277.846,58.025 227.321,7.5 "/><path style="fill:#333E48;" d="M96.011,243.992h11.716v37.379h12.963v-37.379h11.683v-10.601H96.011V243.992z M283.149,52.723L232.625,2.197C231.218,0.79,229.311,0,227.321,0H40.342c-4.143,0-7.5,3.358-7.5,7.5v303.188c0,4.143,3.357,7.5,7.5,7.5h237.504c4.143,0,7.5-3.357,7.5-7.5V58.025C285.346,56.036,284.556,54.129,283.149,52.723z M234.821,25.606l24.918,24.919h-24.918L234.821,25.606L234.821,25.606z M47.842,15h171.979v10.263H47.842V15z M270.346,303.188H47.842V40.263h171.979v17.763c0,4.143,3.357,7.5,7.5,7.5h43.024v237.662H270.346z M184.323,243.992h11.716v37.379h12.963v-37.379h11.683v-10.601h-36.361v10.601H184.323z M181.304,233.392h-14.801l-8.336,14.834l-8.664-14.834H135.13l14.965,23.433l-15.917,24.547h14.669l9.256-14.998l9.352,14.998h14.998l-16.344-23.53L181.304,233.392z"/></g></svg>
                </div>
                <sub><?php echo $text_file ?></sub>
            </a>
            <?php
        }
    ?>


    <script src="./index.js"></script>
    
</body>
</html>