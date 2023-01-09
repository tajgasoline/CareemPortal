 

    <!-- Top Bar Start -->
        <div class="topbar grediant-red">
            <!-- LOGO -->
            <div class="topbar-left">
                <a href="../projects/projects-index.html" class="logo">
                    <span>
                        <img src="assets/images/logowhite.png" alt="logo-small" style="height: 68px !important" class="logo-sm">
                    </span>
                    <span>
                        <img src="assets/images/logowhite.png" class="logo-lg logo-light" style="height: 55px !important;" alt="logo-large" >
                      <!--   <img src="../assets/images/logo-dark.png" alt="logo-large" class="logo-lg"> -->
                    </span>
                </a>
            </div>
            <!--end logo-->
            <!-- Navbar -->
            <nav class="navbar-custom">    
                <ul class="list-unstyled topbar-nav float-right mb-0"> 
                  
                 

                    <li class="dropdown float-right" >
                        <a class="nav-link dropdown-toggle waves-effect waves-light nav-user" data-toggle="dropdown" href="#" role="button"
                            aria-haspopup="false" aria-expanded="false">
                             <img src="assets/images/users/user-1.jpg" alt="profile-user" class="rounded-circle" /> 
                            <span class="ml-1 nav-user-name hidden-sm"><?php echo $_SESSION['staffusername'];?><i class="mdi mdi-chevron-down"></i> </span>
                        </a>
                       <div class="dropdown-menu dropdown-menu-right">
                            <!-- <a class="dropdown-item" href="#"><i class="dripicons-user text-muted mr-2"></i> Profile</a> -->
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="logout.php"><i class="dripicons-exit text-muted mr-2"></i> Log-out</a>
                        </div>
                    </li>
                </ul><!--end topbar-nav-->
                <ul class="list-unstyled topbar-nav mb-0">                        
                    <li>
                        <button class="button-menu-mobile nav-link waves-effect waves-light">
                            <i class="dripicons-menu nav-icon"></i>
                        </button>
                    </li>
                     
                </ul>
            </nav>
            <!-- end navbar-->
        </div>